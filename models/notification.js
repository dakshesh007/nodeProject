const mongoose = require('mongoose')
const { Schema } = mongoose;

const notificationSchema = new Schema({
  from:{
    type: mongoose.Types.ObjectId,
    required: true,
    ref:'users'
  },
  to:{
    type: mongoose.Types.ObjectId,
    required: true,
    ref:'users'
  },
  post: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref:'posts'
  },
  type:{
    type: Number,
    required: true
  },
  isRead:{
    type: Boolean,
    default: false
  }
},{timestamps: true})
module.exports = mongoose.model("notification",notificationSchema)