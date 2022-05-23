const mysql = require('mysql2');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./db.js')   

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

  async function  insertGenero(params) {
    await Genero.create(params);  
    let generos= await Genero.findAll({
        attributes: ['id', 'nombre', 'imagen'],
        where: params
    });

    return  JSON.stringify(generos, null, 2);
}
async function findAllGenero(){
 
    let generos= await Genero.findAll({
        attributes: ['id', 'nombre', 'imagen']
    });

    return  JSON.stringify(generos, null, 2);

    }
async function findGeneroBy(params){
    
    let generos= await Genero.findAll({
        attributes: ['id', 'nombre', 'imagen'],
        where: params
    });

    return  JSON.stringify(generos, null, 2);

    }
async function updateGenero(params){
    
        let generos= await Genero.update( params , {
            where: {id: params.id}
          });
    
        return  JSON.stringify(generos, null, 2);
    
}
async function deleteGenero(params){
    
    let generos= await Genero.destroy({
        where: {id: params.id}
      });

    return  JSON.stringify(generos, null, 2);

}
module.exports = {Genero,insertGenero,findAllGenero,findGeneroBy,updateGenero,deleteGenero };