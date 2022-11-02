const express = require('express')
const router = express.Router()
const List = require('../models/list')

router.post('', (req,res,next) => {
  const list = new List({
    title: req.body.title,
    activities: []
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

router.put('/addActivity/:id', (req, res, next) => {

  const activity = {name: req.body.name, date: req.body.date}

  List.updateOne({_id: req.params.id}, {$push:{activities: activity}}).then(result => {
  })

  List.findById((req.params.id)).then(list => {

    const activities = list['activities']

    activityFiltered = activities[activities.length - 1]

    res.status(201).json({
      message: "Activity added!",
      activityId: activityFiltered._id
    })


  })
})

router.put('/editActivity/:id', (req, res, next) => {

  const activity = {id: req.body._id ,name: req.body.name, date: req.body.date}


  List.findById((req.params.id)).then(list => {

    const updatedActivities = list['activities']
    const oldActivityIndex = updatedActivities.findIndex(p => p.id === activity.id)
    updatedActivities[oldActivityIndex] = {id: req.body._id ,name: req.body.name, date: req.body.date}

    const listToUpdate = new List({
      _id: list._id,
      title: list.title,
      activities: updatedActivities
    })

    List.updateOne({_id: req.params.id}, listToUpdate).then(result => {
      res.status(200).json({message: "Activity updated!"})
    })
  })
})

router.put('/deleteActivity/:id', (req, res, next) => {

  const activity = {id: req.body._id ,name: req.body.name, date: req.body.date}


  List.findById((req.params.id)).then(list => {

    const activities = list['activities']
    const updatedActivities = activities.filter(p => p.id !== activity.id)
    console.log(updatedActivities)

    const listToUpdate = new List({
      _id: list._id,
      title: list.title,
      activities: updatedActivities
    })

    List.updateOne({_id: req.params.id}, listToUpdate).then(result => {
      res.status(200).json({message: "Activity deleted!"})
    })
  })
})

module.exports = router
