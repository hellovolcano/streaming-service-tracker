const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class Service extends Model {}

Service.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
            // allowing duplicate names since we're not doing a separate subscription model table
        },
        cost: {
            type: DataTypes.DECIMAL(5,2),
            allowNull: false
        },
        cost_basis: {
            type: DataTypes.ENUM("monthly", "yearly"),
            allowNull: false
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'Service'
    }
)

module.exports = Service 