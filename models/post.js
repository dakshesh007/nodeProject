const mongoose = require('mongoose')
const { Schema } = mongoose;

const postSchema = new Schema({
  user:{
    type: mongoose.Types.ObjectId,
    required: true,
  },
  text: {
    type: String,
  },
  likes:{
    type: Number,
    default: 0
  },
  url:{
    type: Array,
  },
  isDeleted:{
    type: Boolean,
    default: false
  }
},{timestamps: true})
module.exports = mongoose.model("posts",postSchema)