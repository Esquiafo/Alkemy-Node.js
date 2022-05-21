const express = require('express');
const app = express();
const mysql = require('mysql2');
const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('alkemy', 'root', 'root', {
  dialect: 'mysql',
  dialectOptions: {
    host: '127.0.0.1',
    user: 'root',
    database: 'alkemy',
    port: '3306',
  },
});
const nameYourFunction = () => {
    sequelize.authenticate()
      .then((result) => {
        console.log('Result: ',result);
      })
      .catch((error) => {
        console.log('Error: ', error);
      });
  };
nameYourFunction()
// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+"ERROR"));
});

const port = 5000;
app.listen(port);

console.log('App is listening on port ' + port);