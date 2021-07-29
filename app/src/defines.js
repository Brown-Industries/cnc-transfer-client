var Globals = {
  options: {
    serialPortName: "/dev/ttyUSB0",
    serialPortRate: 9600,
    webSocketPortNumber: 3000,
    enable: true,
    serialConnectRetryIntervalInSeconds:5,
    listSerialPorts: false,
  },
  socket:0,
  serialPortReadBytes:0,
  serialPortWriteBytes:0,
  serialPortStatus:"closed",
  wsConnections:[],
};

const log = require("logging");

var exports = (module.exports = {
  Globals: Globals,
  // options: options,
  log: log
});