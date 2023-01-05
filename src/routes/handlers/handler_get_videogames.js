
require('dotenv').config();
const {API_URL_VIDEOGAME,API_KEY} = process.env;
const {Videogame,Genre} =  require('../../db');
const {getVideoGames, getGamesByName} =  require('../../api_rawg/index.js');

module.exports = async (req,res)=>{
    //Config//
const {name} = req.query;
try {
    const apiGames = await getVideoGames(API_URL_VIDEOGAME,API_KEY);
    const dbGames = await  Videogame.findAll({
    include:{
        model:Genre,
        attributes:['name']
    }
    
}); 
 //params o all //
 const concatenado = apiGames.concat(dbGames);
 if(Object.keys(concatenado).length === 0){throw Error('No se encontró Juegos')}
if(!name){res.status(200).send(concatenado)}
else{
    
    let api = await getGamesByName(name,API_URL_VIDEOGAME,API_KEY);
   
    let match = api.concat(dbGames);
     
    match = match.filter(e=>e.name.includes(name.toLowerCase()))  
    
    match.length? 
    res.status(200).send(match):
    res.status(404).send({type:"error",menssage:"No existe ese video game"});

}

} catch (error) {
    res.status(404).send(error);
    
}



}