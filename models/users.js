const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
  name:{
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  userName:{
    type: String,
    required: true,
    unique: true
  },
  isDeleted:{
    type: Boolean,
    default: false
  },
  lastActivateAt:{
    type: Date,
    default: new Date()
  }
},{timestamps: true})
module.exports = mongoose.model("users",userSchema)