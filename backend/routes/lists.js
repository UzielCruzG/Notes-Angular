const express = require('express')
const router = express.Router()
const List = require('../models/list')
const Activity = require('../models/activity')
const User = require('../models/user')

//#region Users

router.post('/createUser', (req, res, next) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    image_path: null, //TODO
    lists: []
  })

  user.save().then(createdUser => {
    res.status(201).json({
      message: 'User created!',
      userId: createdUser._id
    })
  })
})

router.post('/login', (req, res, next) =>{
  const user = {
    username: req.body.username,
    password: req.body.password
  }

  User.find(user).then(userResponse => {
    if (userResponse.length > 0) {
      res.status(200).json(true)
    }
    else {
      res.status(404).json({
        message: "User not found"
      })
    }
  })
})

router.put('/editUser/:id', (req, res, next) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
    image_path: req.body.image_path
  }

  User.updateOne({_id: req.params.id}, user).then(result => {
    res.status(200).json({message: "User updated!", user: result})
  })
})

router.delete('/deleteAccount/:id', (req, res, next) => {

  User.findById((req.params.id)).then((userToBeDeleted) => {

    userToBeDeleted.delete()
    res.status(201).json({
      message: 'User deleted!'
    })
  })

})

//#endregion

//#region Lists
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

//#endregion

//#region Activities
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
//#endregion

module.exports = router
