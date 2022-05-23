const express = require('express');
const app = express();
const mysql = require('mysql2');
const bodyParser = require('body-parser');
var session = require('express-session')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
var http = require('http');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// get config vars
dotenv.config();

// access config var
process.env.TOKEN_SECRET;
const { Sequelize, DataTypes } = require('sequelize');
const res = require('express/lib/response');
const { decode } = require('jsonwebtoken');
const { type } = require('express/lib/response');

function generateAccessToken(token) {
    return jwt.sign(token, process.env.TOKEN_SECRET);
  }
function verifyAccessToken(token) {
    try{
        jwt.verify(token, process.env.TOKEN_SECRET);
        return true
      }catch (err){
        return false;
      }
    
}



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


  
app.get('/character', (req,res) =>{
   res.json(verifyAccessToken(req.headers.authorization))
   res.redirect('/auth/login', (req,res))
  
    
  
});
app.get('/auth/login', (req,res) =>{
  verifyAccessToken(req.headers.authorization) ? res.json('Tu token es correcto') : res.json('Tu token es incorrecto')
  

});
app.post('/auth/create', (req,res) =>{
    const token = generateAccessToken({ token: req.body.email });
    res.json(token);
});
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+"ERROR"));
});

const port = 5000;
app.listen(port);

console.log('App is listening on port ' + port);