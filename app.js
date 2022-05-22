const express = require('express');
const app = express();
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const url = require('url');
var session = require('express-session')
const { Sequelize, DataTypes } = require('sequelize');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
        console.log('Result: ',result);
      })
      .catch((error) => {
        console.log('Error: ', error);
      });


const Personaje = sequelize.define('personaje', {
    // Model attributes are defined here
    id:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
    },
    imagen: {
      type: DataTypes.STRING,
    },
    nombre: {
      type: DataTypes.STRING
    },
    edad: {
        type: DataTypes.INTEGER
    },
    peso: {
      type: DataTypes.INTEGER
    },
    historia: {
        type: DataTypes.STRING
    },

  });
const Pelicula = sequelize.define('pelicula', {
    // Model attributes are defined here
    id:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
    },
    imagen: {
      type: DataTypes.STRING,
    },
    titulo: {
      type: DataTypes.STRING
    },
    fecha: {
        type: DataTypes.INTEGER
    },
    puntaje: {
      type: DataTypes.INTEGER
    },
    

  });

const Genero = sequelize.define('genero', {
    // Model attributes are defined here
    id:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
    },
    imagen: {
      type: DataTypes.STRING,
    },
    nombre: {
      type: DataTypes.STRING
    },
  });

  Personaje.belongsToMany(Pelicula, { through: 'Personaje_Pelicula' });
  Pelicula.belongsToMany(Personaje, { through: 'Personaje_Pelicula' });
  Genero.belongsToMany(Pelicula, { through: 'Genero_Pelicula' });
  Pelicula.belongsToMany(Genero, { through: 'Genero_Pelicula' });




var start = async function(a, b) { 
    // Your async task will execute with await


  }
  
app.get('/character', (req,res) =>{
    (async () => {
        await sequelize.sync({ force: true });
        // Code here
      })();
    console.log(req.query)
    start()
    
  
});
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+"ERROR"));
});

const port = 5000;
app.listen(port);

console.log('App is listening on port ' + port);