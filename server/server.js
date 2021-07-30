const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express(),
      bodyParser = require("body-parser");
      port = 3080;

const directoryPath = path.join('/mnt/cnc_programs/109');
// place holder for the data
const users = [];
files = [];

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../react-ui/build')));

app.get('/api/users', (req, res) => {
  console.log('api/users called!')
  res.json(users);
});

app.get('/api/files', (req, res) => {
  console.log('api/files called!');
  fs.readdir(directoryPath, function(err, f) {
    //handling error
    if(err){
      return console.log('Unable to scan directory: ' + err);
    }
    
    f.forEach(function (file) {
      files.push(file);
      //console.log(file); 
    });
  });

  console.log(files); 
  res.json(files);
});


app.post('/api/user', (req, res) => {
  const user = req.body.user;
  console.log('Adding user :::::', user);
  console.log(files);

  users.push(user);
  res.json("user addedd");
});

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '../react-ui/build/index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});