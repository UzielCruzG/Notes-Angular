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
router.post('/createList/:id', (req,res,next) => {
  const list = new List({
    title: req.body.title,
    activities: []
  })

  User.updateOne({_id: req.params.id}, {$push:{lists: list}}).then(result => {
    res.status(201).json({
      message: 'List added!'
    })
  })

})


router.get('/:id', (req,res,next)=>{

  User.findById((req.params.id)).then(userInfo => {
    res.status(200).json({
      message: "User found",
      lists: userInfo.lists
    })
  })

})

router.put('/updateList/:id', (req, res, next) => {
  const list = {
    title: req.body.title
  }

  User.updateOne({'lists._id': req.params.id}, {'$set': {'lists.$.title': list.title}})
  .then(listUpdated => {
    res.status(200).json({message: "List updated!"})
  })
})

router.delete('/:id/:idList', (req, res, next) => {

  User.updateOne({_id: req.params.id}, {'$pull': {'lists': {_id: req.params.idList}}})
  .then(listToBeDeleted => {
    res.status(201).json({
      message: 'List deleted!'
    })
  })

})

//#endregion

//#region Activities
router.post('/:id/:idList', (req, res, next) => {

  const activity = {
    name: req.body.name,
    date: req.body.date
  }

  User.updateOne({_id: req.params.id},
    {$push:
      {
        "lists.$[list].activities": activity
      }
    },
    {
      arrayFilters:[
        {"list._id": req.params.idList}
      ]
    })
    .then(result => {
    res.status(201).json({
      message: 'Activity added!'
    })

  })
})

router.put('/:id/:idList/:idActivity', (req, res, next) => {

  const activity = {
    name: req.body.name,
    date: req.body.date
  }

  User.updateOne({_id: req.params.id},
    {$set:
      {
        "lists.$[list].activities.$[act].name": activity.name,
        "lists.$[list].activities.$[act].date": activity.date
      }
    },
    {
      arrayFilters:[
        {"list._id": req.params.idList},
        {"act._id": req.params.idActivity}
      ]
    })
    .then(result => {
    res.status(201).json({
      message: 'Activity modified!',
      response: result
    })

  })

})

router.delete('/:id/:idList/:idActivity', (req, res, next) => {

  User.updateOne(
    {_id: req.params.id},
    {$pull:
      {
        "lists.$[list].activities": {_id: req.params.idActivity}
      }
    },
    {
      arrayFilters:
      [
        {"list._id": req.params.idList}
      ]
    })
  .then(listToBeDeleted => {
    res.status(201).json({
      message: 'Activity deleted!'
    })
  })
})
//#endregion

module.exports = router

