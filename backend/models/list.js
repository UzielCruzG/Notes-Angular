const mongoose = require('mongoose')
const Activity = require('./activity')

const listSchema = mongoose.Schema({
  title: {type: String, required:true},
  activities: [Activity.schema]
})


module.exports = mongoose.model('List', listSchema)
