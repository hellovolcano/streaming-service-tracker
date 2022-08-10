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
            allowNull: false
            // allowing duplicate names since we're not doing a separate subscription model table
        },
        cost: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        cost_basis: {
            type: DataTypes.ENUM(monthly, yearly),
            allowNull: false
        },
        auto_renewal_date: {
                type: DataTypes.DATEONLY,
                allowNull: false 
        },
        is_active: {
            type: DataTypes.BOOLEAN,
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