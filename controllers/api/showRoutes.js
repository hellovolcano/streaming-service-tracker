const router=require('express').Router();
const sequelize = require('../../config/connection')
const {Show} = require('../../models');


// Find all shows 
router.get('/',async(req,res)=>{
  Show.findall()
  .then(dbShowData=>res.json(dbShowData))
  .catch(err=>{
    console.log(err);
    res.status(500).json(err);
  })

})

// Find one show
router.get('/:id',async(req,res)=>{
  Show.findOne({
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
router.post('/',async(req,res)=>{
  Show.create({
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
router.delete('/:id',async(req,res)=>{
    Show.destroy({
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
router.put('/:id',async(req,res)=>{
    Show.update({
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
})

module.exports=router;
