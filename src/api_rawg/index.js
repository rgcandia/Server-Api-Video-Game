const fetch = require("node-fetch-commonjs")

//trae la info genres de la API externa, y crea las tablas.
const setTableGenres = (model,url,key)=>{
   
    fetch(url+`?key=`+key)
    .then(response=>response.json())
    .then(response=>response.results)
    .then(response=>{

      if(!response){return ()=>{}} //para que no se me rompa el servidor cuando no 
     return response.map(genre=>{
       return {
          id:genre.id,
          name:genre.name,
          image_background:genre.image_background,
       }})
    })
    .then(response=>{model.bulkCreate(response) }) 
    .catch(error=>console.log(error))
 }

///////////////////////// Retorna un array con 100 videojuegos
const getVideoGames= async (url,key)=>{
   let games =[];
   let arrayPromise =[];
   let count = 1;
   const amount=50; // Cantidad ede juegos que voy a traer a mi db.
   while(count<=amount){
      let promise=  fetch(url+`/${count}?key=`+key)
      .then(response=>response.json())
      .then(game=> {
         if(game.name){
          const obj = {
                 id:game.id,
               name:game.name.toLowerCase(),
                  description:game.description,
                  released:game.released,
                  rating:game.ratings.map(e=>e),
                  platforms:game.platforms.map(e=>e.platform),
                  background_image:game.background_image,
                  genres:game.genres.map(e=>e.name),
            }
           
           return obj; 
         }
   
         })
      .catch(error=>console.log(error))
      arrayPromise.push(promise)
      
    count++;
   }
    games = await Promise.all(arrayPromise)
    
   return games;
}
// const getVideoGames= async (url,key)=>{
//    let games =[];
//    let count = 1;
//    const amount=50; // Cantidad ede juegos que voy a traer a mi db.
//    while(count<=amount){
//       let promise=  fetch(url+`/${count}?key=`+key)
//       .then(response=>response.json())
//       .then(game=> {
//          if(game.name){
//           const obj = {
//                  id:game.id,
//                name:game.name.toLowerCase(),
//                   description:game.description,
//                   released:game.released,
//                   rating:game.ratings.map(e=>e),
//                   platforms:game.platforms.map(e=>e.platform),
//                   background_image:game.background_image,
//                   genres:game.genres.map(e=>e.name),
//             }
           
//            return obj; 
//          }
//          })
//          .catch(error=>console.log(error))
//     let value = await promise;
    
//     if(value!=null){games.push(value);  } 
//     count++;
//    }
//    return games;
// }

/////Trae un array de resultados que coincidan con mi busqueda///////////
const getGamesByName = async (name,url,key)=>{
 let results = await fetch(url+'?search='+name+'&key='+key)
 .then(response=>response.json())
 .then(response=>response.results)
 .catch(error=>console.log(error))

   return results.map(game=>{
      let obj = {
         id:game.id,
       name:game.name.toLowerCase(),
          description:game.description_raw?game.description:null,
          released:game.released?game.released:null,
          rating:game.rating?game.ratings.map(e=>e):null,
          platforms:game.platforms?game.platforms.map(e=>e.platform):null,
          background_image:game.background_image?game.background_image:null,
          genres:game.genres?game.genres.map(e=>e.name):null,
    }
    return obj;
    })


 
}
 
 module.exports= {setTableGenres,getVideoGames,getGamesByName}