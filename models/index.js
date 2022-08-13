const Service = require('./Service')
const Show = require('./Show')

// Service has one user

// Service has many shows
Show.hasOne(Service,{
    foreignKey:'service_id'
})

module.exports = { Service,Show }