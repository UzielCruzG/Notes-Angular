const mongoose = require('mongoose')
const List = require('./list')

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  lists: [List.schema]
})


module.exports = mongoose.model('User', userSchema)
