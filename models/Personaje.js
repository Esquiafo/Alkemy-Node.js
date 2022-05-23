const mysql = require('mysql2');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./db.js')   

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

async function  insertPersonaje(params) {
    await Personaje.create(params);  
    let personajes= await Personaje.findAll({
        attributes: ['id', 'nombre', 'imagen'],
        where: params
    });

    return  JSON.stringify(personajes, null, 2);
}
async function findAllPersonajes(){
 
    let personajes= await Personaje.findAll({
        attributes: ['id', 'nombre', 'imagen']
    });

    return  JSON.stringify(personajes, null, 2);

    }
async function findPersonajesBy(params){
    
    let personajes= await Personaje.findAll({
        attributes: ['id', 'nombre', 'imagen'],
        where: params
    });

    return  JSON.stringify(personajes, null, 2);

    }
async function updatePersonaje(params){
    
        let personajes= await Personaje.update( params , {
            where: {id: params.id}
          });
    
        return  JSON.stringify(personajes, null, 2);
    
}
async function deletePersonaje(params){
    
    let personajes= await Personaje.destroy({
        where: {id: params.id}
      });

    return  JSON.stringify(personajes, null, 2);

}
module.exports = {Personaje, insertPersonaje, findAllPersonajes, findPersonajesBy, updatePersonaje, deletePersonaje};