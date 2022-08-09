const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class Service extends Model {}

// creating variables to store the monthly vs. yearly in case we want to change 
// what we actually need (could also be an integer 1 vs 12)
const monthly = 'monthly'
const yearly = 'yearly'

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
            allowNull: false,
            unique: true
        },
        cost: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        cost_basis: {
            type: DataTypes.ENUM(monthly, yearly),
            allowNull: false
        },
        renewal_date: {
                type: DataTypes.DATE,
                allowNull: false 
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'service'
    }
)

module.exports = Service 