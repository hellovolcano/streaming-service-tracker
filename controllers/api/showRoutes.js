const router=require('express').Router();
const sequelize = require('../../config/connection')
const {TvShow} = require('../../models');


// Find all shows 
router.get('/',(req,res)=>{
  TvShow.findAll()
  .then(dbShowData=>res.json(dbShowData))
  .catch(err=>{
    console.log(err);
    res.status(500).json(err);
  })

})

// Find one show
router.get('/:id',(req,res)=>{
  TvShow.findOne({
    where:{
      id:req.params.id
    },
    attributes: ['id','name','premiereDate','service_id']
  })
  .then(dbShowData=>{
    if(!dbShowData) {
      res.status(404).json({ message: 'No shows with that name have been found'})
      return
    }  
    res.json(dbShowData)
  
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json(err);
  })
})

// creates a new show
router.post('/',(req,res)=>{
  TvShow.create({
    id: req.body.id,
    name: req.body.name,
    premiereDate:req.body.premiereDate,
    service_id:req.body.service_id,
  })
  
  .then(dbShowData => res.json(dbShowData))
  .catch(err=> {
    console.log(err);
    res.status(500).json(err);
  })
      
});

// Deletes a show
router.delete('/:id',(req,res)=>{
    TvShow.destroy({
        where:{
            id:req.params.id
        }
    })
    .then(affectedRows => {
        if (affectedRows > 0) {
          res.status(200).end();
        } else {
          res.status(404).end();
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
});

// updates a show
router.put('/:id',(req,res)=>{
    TvShow.update(
      {
        id:req.body.id,
        name:req.body.name,
        premiereDate:req.body.premiereDate,
        service_id:req.body.service_id
      },
      {
        where:{
          id:req.params.id
        }
      }
    )
    .then(dbShowData => {
      if(!dbShowData) {
        res.status(404).json({message: "No show found with that id"})
        return
      }
      res.json(dbShowData)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json(err);
    });
})

module.exports=router;
