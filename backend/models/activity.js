const mongoose = require('mongoose')

const activitySchema = mongoose.Schema({
  name: String,
  date: Date
})

module.exports = mongoose.model('Activity', activitySchema)
