const mysql = require('mysql2');
const { Sequelize, DataTypes } = require('sequelize');
// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('alkemy', 'root', 'root', {
    dialect: 'mysql',
    dialectOptions: {
      host: '127.0.0.1',
      port: '3306',
    },
  });
  
      sequelize.authenticate()
        .then((result) => {
          console.log('Conectado a la DB');
        })
        .catch((error) => {
          console.log('Error: ', error);
        });
module.exports = sequelize;