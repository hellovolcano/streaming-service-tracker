const router=require('express').Router();
const {Show} = require('../../models');

// creates a new show

router.post('/',async(req,res)=>{
    try{
        const showData = await Show.create({
          id: req.body.id,
          name: req.body.name,
          premiereDate:req.body.premiereDate,
          service_id:req.body.service_id,
        });
        
        
    } catch (err){
        console.log(err);
        res.status(500).json(err);
    }
});


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
