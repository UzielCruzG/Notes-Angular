const mongoose = require('mongoose')
//mongoose.com to check for more about functionality
const activitySchema = mongoose.Schema({
  name: String,
  date: Date
})

const listSchema = mongoose.Schema({
  title: {type: String, required:true},
  activities: [activitySchema]
})


module.exports = mongoose.model('List', listSchema)
