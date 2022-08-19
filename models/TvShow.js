const {Model,DataTypes}=require('sequelize');
const sequelize=require('../config/connection');

class TvShow extends Model{}

TvShow.init(
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
            type:DataTypes.DATEONLY,
            allowNull:false,
        },
        service_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model: 'Service',
                key:'id',
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id'
            }
        }
    },
    {
     sequelize,
     freezeTableName:true,
     underscored:true,
     modelName:'TvShow',   
    }
);

module.exports=TvShow;