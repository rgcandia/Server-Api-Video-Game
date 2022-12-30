const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
      primaryKey: true,
    },
    description:{
      type: DataTypes.TEXT,
      allowNull: false,
    },
    released:{
      type: DataTypes.STRING
    },
    rating:{
      type:DataTypes.JSON
    },
    platforms:{
      type:DataTypes.JSON,
      allowNull:false
    },
    db:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:true,
    },
    background_image:{
      type:DataTypes.STRING,
    }
  },
  {
    timestamps:false,
  });
};

