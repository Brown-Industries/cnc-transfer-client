/**
 * Connects serial port to web socket
 * By: Ari Saif
 */
//-----------------------------------------------------------------------------
const util = require("util");

var defines = require("./defines");
var Globals = defines.Globals;
var log = defines.log;

var SerialPort = require("serialport");
var WebSocketServer = require("ws").Server;

var devicePort;

var Readline = SerialPort.parsers.Readline;
var parser = new Readline();
//-----------------------------------------------------------------------------
async function listSerialPorts() {
  const serialPortList = util.promisify(SerialPort.list);
  log.info("Listing serial ports...");

  try {
    let ports = await serialPortList();
    ports.forEach((port, i) => {
      log.info(`Port ${i}: `, JSON.stringify(port, null, 2));
    });
  } catch (error) {
    log.error(error);
  }
}
//-----------------------------------------------------------------------------
/**
 * Initializes the serial
 */
function devicePortInit() {
  log.info(
    `Initializing serial port: `,
    `Name:`,
    ` ${Globals.options.serialPortName}, `,
    `Baud Rate:`,
    ` ${Globals.options.serialPortRate}`
  );
  devicePort = new SerialPort(
    Globals.options.serialPortName,
    Globals.options.serialPortRate
  );
  devicePort.pipe(parser);

  devicePort.on("open", () => {
    log.info(`Serial port successfully opened!`);
    Globals.serialPortStatus = "open";
  });

  devicePort.on("close", () => {
    log.info("port closed.");
    Globals.serialPortStatus = "closed";
  });

  devicePort.on("error", error => {
    log.error("Serial port error: " + error);
    log.info(
      `Will retry in ${
        Globals.options.serialConnectRetryIntervalInSeconds
      } seconds`
    );

    broadcast(
      "Error in opening serial port. " +
        `Will retry in ${
          Globals.options.serialConnectRetryIntervalInSeconds
        } seconds`
    );
    setTimeout(() => {
      devicePortInit();
    }, Globals.options.serialConnectRetryIntervalInSeconds * 1000);
  });

  // called when there's new data incoming
  parser.on("data", readSerialData);
}

//-----------------------------------------------------------------------------
/**
 * broadcasts messages to all webSocket clients
 * @param {object} data
 */
function broadcast(data) {
  for (let c of Globals.wsConnections) {
    c.send(data);
  }
}
//-----------------------------------------------------------------------------
/**
 * Called when new data comes into the serial port:
 * @param {object} data
 */
function readSerialData(data) {
  log.info("Serial READ:", data);
  if (Globals.wsConnections.length > 0) {
    broadcast(data);
  }
  Globals.serialPortReadBytes += data.length;
}
//-----------------------------------------------------------------------------
/**
 *
 * @param {object} data
 */
function sendToSerial(data) {
  log.info(`Received from websocket: `, data.toString());
  log.info("Sending to serial: ", data.toString());
  devicePort.write(data);
  Globals.serialPortWriteBytes += data.length;
}

//-----------------------------------------------------------------------------
// webSocket Server event functions
//-----------------------------------------------------------------------------
/**
 *
 * @param {object} client
 */
function handleConnection(client) {
  log.info(`New websocket Connection established!`);
  try {
  } catch (error) {}
  // add this client to the Globals.wsConnections array
  Globals.wsConnections.push(client);

  log.info(
    `Number of connected websocket clients: ${Globals.wsConnections.length}`
  );

  client.on("message", sendToSerial);

  client.on("close", () => {
    log.info("Web socket connection closed");
    //Delete client from the array
    var position = Globals.wsConnections.indexOf(client);
    Globals.wsConnections.splice(position, 1);
  });
}

//-----------------------------------------------------------------------------
/**
 * Start
 */
async function start() {
  log.info("Start...");
  log.info(
    "-----------------------------------------------------------------------------"
  );
  if (Globals.options.listSerialPorts) {
    await listSerialPorts();
  }
  devicePortInit();
  let webSocket;
  try {
    webSocket = new WebSocketServer({ port: Globals.options.webSocketPortNumber });
    webSocket.on("connection", handleConnection);
  } catch (error) {
    log.error(error);
    return;
  }
  Globals.options.enable = true;
}
//-----------------------------------------------------------------------------
async function stop() {
  Globals.options.enable = false;
}
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
module.exports = function(options = {}) {
  Object.assign(Globals.options, options);
  return {
    stop: stop,
    start: start,
    log: log
  };
};