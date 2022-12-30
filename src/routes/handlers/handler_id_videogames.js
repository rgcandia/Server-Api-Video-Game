const { response } = require('express');
const fetch = require("node-fetch-commonjs")
const {Videogame,Genre} =  require('../../db');
const {API_URL_VIDEOGAME,API_KEY} =  process.env;

// Funcion para verificar si es o no un tipo de dato UUID
function checkIfValidUUID(str) {
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  
    return regexExp.test(str);
  }
//
module.exports = async (req,res)=>{
    const {id} =  req.params;
    //para la api preguntar si es number o no.
    if(checkIfValidUUID(id)){
        const game = await Videogame.findByPk(id,{
          include:{
            model:Genre,
            attributes:['name']
        }
        });
        
        
        res.status(200).send(game);
    
    }
    else{
        
        let promise=  fetch(API_URL_VIDEOGAME+`/${id}?key=`+API_KEY)
        .then(response=>response.json())
        .then(game=> {
           if(game.name){
            const obj = {
                 id:game.id,
                 name:game.name.toLowerCase(),
                    description:game.description_raw,
                    released:game.released,
                    rating:game.ratings.map(e=>e),
                    platforms:game.platforms.map(e=>e.platform),
                    background_image:game.background_image,
                    genres:game.genres.map(e=>e.name),
              }
             return obj; 
           } else{
            res.status(404).send('El juego con ese ID no existe')
           }
           })
           const response =  await promise;
         res.status(200).send(response);
    }
    
}