const {Videogame,Genre} =  require('../../db.js');
module.exports=async (req,res)=>{
    const {name,description,released,rating,platforms,image,genres} =  req.body;
    const img_default = "https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg"
    if (image===''){background_image=img_default}
    else{background_image=image}
    let name_r = name.toLowerCase();
    let gameCreated = await Videogame.create({
        name_r,
        description,
        released,
        rating,
        platforms,
        background_image,
    });
    
    let genresdb = await Genre.findAll({
        where:{
            name:genres
        }
    });

    gameCreated.addGenre(genresdb);
    res.status(200).send('Personaje creado con éxito')
  

}