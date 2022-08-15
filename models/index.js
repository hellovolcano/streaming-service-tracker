const Service = require('./Service')
const Show = require('./Show')
const User = require('./User');

// Service has one user

// Service has many shows
Show.hasOne(Service,{
    foreignKey:'service_id'
})

module.exports = { Service, Show,User }