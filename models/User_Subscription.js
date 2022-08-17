const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class User_Subscription extends Model { }

User_Subscription.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        service_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Service',
                key: 'id'
            }
        },
        is_active: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
         auto_renewal_date: {
            type: DataTypes.DATEONLY,
            allowNull: true
        }
    },
    {
        sequelize,
        freezeTableName: true,
        timestamps: false,
        underscored: true,
        modelName: 'User_Subscription'
    }
)

module.exports = User_Subscription 