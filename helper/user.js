const  User = require('../models/users')

class UserHelper {
  async add(paylod){
    try {
      return await User.create(paylod)
    } catch (e) {
      console.log(e)
      throw e
    }
  }
  
  async find(query){
    try {
      return await User.find(query)
    } catch (e) {
      throw e
    }
  }
  
  async findOne(query){
    try {
      return await User.findOne(query)
    } catch (e) {
      throw e
    }
  }
}

module.exports = new UserHelper()