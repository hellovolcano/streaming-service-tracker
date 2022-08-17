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
        /**
         * KATE:
         * Subscription table should have subscription start date not renewal date. 
         * Once the renewal date is passed, the renewal date would need to be updated. 
         * This means that we need to either update that value each time they login, 
         * or have a background service to update the value. 
         * It makes more sense to have a subscription start date, and calculate the renewal date
         */
        start_date: {
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