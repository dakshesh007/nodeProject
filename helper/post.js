const Post = require('../models/post')

class PostHelper{
  async add(paylod){
    try {
      return await Post.create(paylod)
    } catch (e) {
      console.log(e)
      throw e
    }
  }
  
  async find(query){
    try {
      return await Post.find(query)
    } catch (e) {
      throw e
    }
  }
  
  async findOne(query){
    try {
      return await Post.findOne(query).lean()
    } catch (e) {
      throw e
    }
  }
  
}

module.exports = new PostHelper()