const express = require('express')
const router = express.Router()
const List = require('../models/list')
const Activity = require('../models/activity')
const User = require('../models/user')
const nodemailer = require('nodemailer');

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

router.post('', (req, res, next) =>{
  const user = {
    username: req.body.username,
    password: req.body.password
  }

  User.find(user).then(userResponse => {
    if (userResponse.length > 0) {
      res.status(200).json({
        user: userResponse,
        result: true
      })
    }
    else {
      res.status(404).json({
        message: "User not found",
        result: false
      })
    }
  })
})

router.put('/:id', (req, res, next) => {
  const user = {
    username: req.body.username,
    password: req.body.password
  }

  User.updateOne({_id: req.params.id}, user).then(result => {
    res.status(200).json({message: "User updated!", user: result})
  })
})

router.delete('/:id', (req, res, next) => {

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
  })

  User.findById((req.params.id)).then(userInfo => {

    lists = userInfo.lists
    res.status(201).json({
      message: "List Added!",
      listId: lists[lists.length - 1]._id
    })
  })

})

router.get('/lists/:id', (req,res,next)=>{

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
    res.status(200).json({
      message: 'List deleted!'
    })
  })

})

//#endregion

//#region Activities
router.post('/createActivity/:id/:idList', (req, res, next) => {

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
    }).then(result => {

      User.findById((req.params.id)).then(userInfo => {
        listActivities = userInfo.lists.find(p => p.id == req.params.idList).activities //To test
        res.status(201).json({
          message: "Activity Added!",
          activityId: listActivities[listActivities.length - 1]._id
        })
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
    res.status(200).json({
      message: 'Activity deleted!'
    })
  })
})
//#endregion

//#region Email
router.post('/sendEmail', (req, res, next) => {

  User.findById(req.body.id).then(user => {
    const email = user.email
    console.log(email)

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'correo.notes.inc@gmail.com',
        pass: 'pvfxorrfshbnwzhk'
      }
    });

    var mailOptions = {
      from: 'correo.notes.inc@gmail.com',
      to: 'LRS19110493@purisima.tecnm.mx',
      subject: 'This is a test',
      text: 'asdfasdfasdfasdf'
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).json({
          message: 'Email sent!'
        })
      }
    });
  })

})


//#endregion
module.exports = router

