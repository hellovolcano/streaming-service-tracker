const Service = require('./Service')
const TvShow = require('./TvShow')
const User = require('./user');
const User_Subscription = require('./User_Subscription')

// Service has many shows
Service.hasMany(TvShow, {
    foreignKey: 'service_id'
})

// Service has many shows
TvShow.hasOne(Service, {
    foreignKey:'service_id'
})

// Show belongs to User
TvShow.belongsTo(User, {
    foreignKey: 'user_id'
})

// User has many shows
User.hasMany(TvShow, {
    foreignKey: 'user_id'
})

// Service has many users
Service.belongsToMany(User, {
    through: User_Subscription,
    foreignKey: 'service_id'
})

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

User_Subscription.belongsTo(Service, {
    foreignKey: 'service_id'
})

User_Subscription.belongsTo(User, {
    foreignKey: 'user_id'
})

module.exports = { Service, TvShow: TvShow, User, User_Subscription };
