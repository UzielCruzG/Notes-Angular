const express = require('express')
const router = express.Router()
const List = require('../models/list')

router.post('', (req,res,next) => {
  const list = new List({
    title: req.body.title
  })

  list.save().then(createdList => {
    res.status(201).json({
      message: 'List added successfully',
      listId: createdList._id
    })
  })
})


router.get('', (req,res,next)=>{

  List.find().then(documents => {

    res.status(200).json({

      message: 'Listas expuestas con exito',
      lists: documents
    })

  })

})

router.get('/:id', (req,res,next) => {

  List.findById(req.params.id).then( list => {

    if (list) {
      res.status(200).json(list)
    } else {
      res.status(404).json({
        message: "List not found"
      })
    }

  })

})

router.put('/:id', (req, res, next) => {
  const list = new List({
    _id: req.body.id,
    title: req.body.title
  })

  List.updateOne({_id: req.params.id}, list).then(result => {
    res.status(200).json({message: "List updated!"})
  })
})

router.post('/:id', (req,res,next) => {
  List.findById((req.params.id)).then((list) =>{
    res.status(200).json({
      message: 'List found!',
      list: list
    })
  })
})

router.delete('/:id', (req, res, next) => {

  List.findById((req.params.id)).then((listToBeDeleted) => {

    listToBeDeleted.delete()

    res.status(201).json({
      message: 'List deleted!'
    })
  })

})

module.exports = router
