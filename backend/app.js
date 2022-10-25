const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const listsRoutes = require('./routes/lists')

const app = express()
mongoose.connect("mongodb+srv://Administrator:Lq8nbWy5GNVXRXaS@postscluster.5nwyax6.mongodb.net/remindersData?retryWrites=true&w=majority")
.then(()=> {
  console.log('Base de datos conectada')
})
.catch(() => {
  console.log('Conexion fallida')
})

app.use(bodyparser.json())

app.use(bodyparser.urlencoded({extended: false}))

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Request-Width, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  next();
})

app.use('/api/lists', listsRoutes)


module.exports = app
