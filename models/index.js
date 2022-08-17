const Service = require('./Service')
const Show = require('./Show')
const User = require('./user');
const User_Subscription = require('./User_Subscription')

// Service has many shows
Service.hasMany(Show, {
    foreignKey: 'service_id'
})

// Service has many shows
Show.hasOne(Service,{
    foreignKey:'service_id'
})

// Service has many users
Service.belongsToMany(User, {
    through: User_Subscription,
    foreignKey: 'service_id'
})

// KATE: Removed foreign key based on documentation found here: 
// https://sequelize.org/api/v6/class/src/associations/belongs-to-many.js~belongstomany

// User belongs to many services
User.belongsToMany(Service, {
    through: User_Subscription,
    foreignKey: 'user_id'
})

// Service belongs t0 many Users
Service.belongsToMany(User, {
    through: User_Subscription,
    foreignKey: 'service_id'
})

module.exports = { Service, Show, User, User_Subscription };
