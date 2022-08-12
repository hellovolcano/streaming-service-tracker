const {Model,DataTypes}=require('sequelize');
const sequelize=require('../config/connection');

class Show extends Model{}

Model.init(
    {
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true,
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        premiereDate:{
            type:DataTypes.DATE,
            allowNull:false,
        },
        service_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model: 'streaming',
                key:'id',
            },
        },
    },
    {
     sequelize,
     freezeTableName:true,
     underscored:true,
     modelName:'Show',   
    }
);

module.exports=Show;