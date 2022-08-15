const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class User_Subscription extends Model {}

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
                model: 'service',
                key: 'id'
            }
        },
        is_active: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        auto_renewal_date: {
            type: DataTypes.DATEONLY,
            allowNull: false 
        }
    },
    {
        sequelize,
        freezeTableName: true,
        timestamps: false,
        underscored: true,
        modelName: 'user_subscription'
    }
)

module.exports = User_Subscription 