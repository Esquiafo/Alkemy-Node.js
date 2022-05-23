const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const {Personaje, insertPersonaje, findAllPersonajes, findPersonajesBy, updatePersonaje, deletePersonaje} = require('./models/Personaje')
const {Pelicula, insertPelicula, findAllPelicula, findPeliculaBy, updatePelicula, deletePelicula} = require('./models/Pelicula')
const {Genero, insertGenero, findAllGenero, findGeneroBy, updateGenero, deleteGenero} = require('./models/Genero')
const sequelize = require('./models/db')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CONFIG Y ACCESS ENV
dotenv.config();
process.env.TOKEN_SECRET;


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
// CREACION DE TABLAS PK
  Personaje.belongsToMany(Pelicula, { through: 'Personaje_Pelicula' });
  Pelicula.belongsToMany(Personaje, { through: 'Personaje_Pelicula' });
  Genero.belongsToMany(Pelicula, { through: 'Genero_Pelicula' });
  Pelicula.belongsToMany(Genero, { through: 'Genero_Pelicula' });
  sequelize.sync()
// -----> CRUD PERSONAJE INICIO <-----
app.get('/character', (req,res) =>{
    verifyAccessToken(req.headers.authorization) 
    
    ? 
    Object.keys(req.query).length > 0 
      ? 
      findPersonajesBy(req.query).then(x=> res.json(JSON.parse(x)))
      :
      findAllPersonajes().then(x=> res.json(JSON.parse(x)))
  
    : 
    res.json('Tu token es incorrecto')
  
});
app.post('/character', (req,res) =>{
    verifyAccessToken(req.headers.authorization) 
    
    ? (

      insertPersonaje(req.query).then(x=> res.json(JSON.parse(x)))

    )
     
    : res.json('Tu token es incorrecto')
  
});
app.put('/character', (req,res) =>{
  verifyAccessToken(req.headers.authorization) 
  
  ? 
  Object.keys(req.query).length > 0 
    ? 
    updatePersonaje(req.query).then(x=> res.json(JSON.parse(x)))
    :
    res.json('Error en la Query')

  : 
  res.json('Tu token es incorrecto')

});
app.delete('/character', (req,res) =>{
  verifyAccessToken(req.headers.authorization) 
  
  ? 
  Object.keys(req.query.id).length > 0 
    ? 
    deletePersonaje(req.query).then(res.json('Acabas de borrar el Personaje con ID: '+ req.query.id))
    :
    res.json('Error en la Query')

  : 
  res.json('Tu token es incorrecto')

});
// -----> CRUD PERSONAJE FIN <-----

// -----> CRUD PELICULA INICIO <-----
app.get('/movie', (req,res) =>{
  verifyAccessToken(req.headers.authorization) 
  
  ? 
  Object.keys(req.query).length > 0 
    ? 
    findPeliculaBy(req.query).then(x=> res.json(JSON.parse(x)))
    :
    findAllPelicula().then(x=> res.json(JSON.parse(x)))

  : 
  res.json('Tu token es incorrecto')

});
app.post('/movie', (req,res) =>{
  verifyAccessToken(req.headers.authorization) 
  
  ? (

    insertPelicula(req.query).then(x=> res.json(JSON.parse(x)))

  )
   
  : res.json('Tu token es incorrecto')

});
app.put('/movie', (req,res) =>{
verifyAccessToken(req.headers.authorization) 

? 
Object.keys(req.query).length > 0 
  ? 
  updatePelicula(req.query).then(x=> res.json(JSON.parse(x)))
  :
  res.json('Error en la Query')

: 
res.json('Tu token es incorrecto')

});
app.delete('/movies', (req,res) =>{
verifyAccessToken(req.headers.authorization) 

? 
Object.keys(req.query.id).length > 0 
  ? 
  deletePelicula(req.query).then(res.json('Acabas de borrar el Pelicula con ID: '+ req.query.id))
  :
  res.json('Error en la Query')

: 
res.json('Tu token es incorrecto')

});
// -----> CRUD Pelicula FIN <-----

// -----> AUTH INICIO <-----
app.get('/auth/login', (req,res) =>{
  verifyAccessToken(req.headers.authorization) 
  ? res.json('Tu token es correcto') 
  : res.json('Tu token es incorrecto')
  

});
app.post('/auth/create', (req,res) =>{
    const token = generateAccessToken({ token: req.body.email });
    res.json(token);
});
// -----> AUTH FIN <-----
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+"ERROR"));
});

const port = 5000;
app.listen(port);

console.log('App is listening on port ' + port);