const mongoose = require('mongoose')

//mongoose.com to check for more about functionality
const listSchema = mongoose.Schema({
  title: {type: String, required:true}
})

module.exports = mongoose.model('List', listSchema)
