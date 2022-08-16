const router = require('express').Router()
const sequelize = require('../../config/connection')
const { Service } = require('../../models')

// GET all services => /api/services
router.get('/', (req, res) => {
    Service.findAll()
    .then(serviceData => res.json(serviceData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

// GET one service => /api/services/:id
router.get('/:id', (req, res) => {
    Service.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id','name','cost','cost_basis','created_at']
    })
    .then(dbServiceData => {
        if(!dbServiceData) {
            res.status(404).json({ message: 'No streaming service found with that idea'})
            return
        }

        res.json(dbServiceData)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })    
})

// CREATE a new streaming service
router.post('/', (req,res) => {
    Service.create({
        name: req.body.name,
        cost: req.body.cost,
        cost_basis: req.body.cost_basis
    })
    .then(dbServiceData => res.json(dbServiceData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

// UPDATE a streaming service
router.put('/:id', (req,res) => {
    Service.update(
        {
        name: req.body.name,
        cost: req.body.cost,
        cost_basis: req.body.cost_basis
        },
        {
            where: {
                id: req.params.id
            },
        })
        .then(dbServiceData => {
            if(!dbServiceData) {
                res.status(404).json({message: "No service found with that id"})
                return
            }
    
            res.json(dbServiceData)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

// DELETE a streaming service
router.delete('/:id', (req,res) => {
    Service.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbServiceData => {
        if(!dbServiceData) {
            res.status(404).json({message: "No service found with that id"})
            return
        }

        res.json(dbServiceData)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

module.exports = router