const mysql = require('mysql2');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./db.js')   

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
  async function  insertPelicula(params) {
    await Pelicula.create(params);  
    let peliculas= await Pelicula.findAll({
        attributes: ['id', 'nombre', 'imagen'],
        where: params
    });

    return  JSON.stringify(peliculas, null, 2);
}
async function findAllPelicula(){
 
    let peliculas= await Pelicula.findAll({
        attributes: ['id', 'nombre', 'imagen']
    });

    return  JSON.stringify(peliculas, null, 2);

    }
async function findPeliculaBy(params){
    
    let peliculas= await Pelicula.findAll({
        attributes: ['id', 'nombre', 'imagen'],
        where: params
    });

    return  JSON.stringify(peliculas, null, 2);

    }
async function updatePelicula(params){
    
        let peliculas= await Pelicula.update( params , {
            where: {id: params.id}
          });
    
        return  JSON.stringify(peliculas, null, 2);
    
}
async function deletePelicula(params){
    
    let peliculas= await Pelicula.destroy({
        where: {id: params.id}
      });

    return  JSON.stringify(peliculas, null, 2);

}
module.exports = {Pelicula,insertPelicula,findAllPelicula,findPeliculaBy,updatePelicula,deletePelicula };