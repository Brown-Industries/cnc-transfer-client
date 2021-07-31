const express = require('express');
const path = require('path');
const fs = require('fs');
const SerialPort = require('serialport');
const app = express(),
      bodyParser = require("body-parser");
      port = 3080;

const directoryPath = path.join('/mnt/cnc_programs/109');
// place holder for the data
const users = [];
files = [];

const myPort = new SerialPort("/dev/ttyS0", {
  baudRate: 9600
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../react-ui/build')));

app.get('/api/users', (req, res) => {
  console.log('api/users called!')
  res.json(users);
});

app.post('/api/user', (req, res) => {
  const user = req.body.user;
  console.log('Adding user :::::', user);
  console.log(files);

  users.push(user);
  res.json("user addedd");
});


app.get('/api/files', (req, res) => {
  console.log('api/files called!');
  
  files = fs.readdirSync(directoryPath);

  //console.log(files); 
  console.log(files.length)
  res.json(files);
});

app.post('/api/transfer/send', (req, res) => {
  const filename = req.body.filename.file;
  const filepath = path.join(directoryPath, filename);
  console.log('Sending program :::::', filepath);
  
  file = fs.readFileSync(filepath);

  const portName = '/dev/ttyUSB0'
  //let myPort = new serialport(portName, 9600);

  myPort.write("Hello Serial Port!");

  

  res.json("file sent"); 
});







app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '../react-ui/build/index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});