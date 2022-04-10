const mongoose = require('mongoose')
const { Schema } = mongoose;

const likeSchema = new Schema({
  user:{
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'users'
  },
  post:{
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'posts'
  },
},{timestamps: true})
module.exports = mongoose.model("likes",likeSchema)