const { DataTypes } = require('sequelize');
module.exports= (sequelize)=>{
    sequelize.define('genre',{
        name :{
            type:DataTypes.STRING,
        },
        id:{
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        image_background:{
            type:DataTypes.STRING,
        }

    }, {
        timestamps:false,
      });
};