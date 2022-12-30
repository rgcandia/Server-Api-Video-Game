const {Genre} =  require('../../db');
module.exports = async (req,res)=>{
  const value = await Genre.findAll();
  if(!value){res.status(404).json('No se pudo cargar los datos')}
  res.status(200).send(value)
}