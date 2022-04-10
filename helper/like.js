const Like = require('../models/like')

class LikeHelper{
  async likePost(query){
    try {
      return await Like.findOneAndUpdate(query,{},{upsert:true,new :true})
    } catch (e) {
      throw e
    }
  }
  
  async disLikePost(query){
    try {
      return await Like.deleteOne(query)
    } catch (e) {
      throw e
    }
  }
  
  async find(query){
    try {
      return await Like.find(query)
    } catch (e) {
      throw e
    }
  }
  
  async totalLikes(query){
    try {
      return await Like.countDocuments(query)
    } catch (e) {
      throw e
    }
  }
  
}

module.exports = new LikeHelper()