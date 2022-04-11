const Notification = require('../models/notification')

class NotificationHelper{
  async save(params){
    try {
      return await Notification.create(params)
    } catch (e) {
      throw e
    }
  }
  
  async read(query){
    try {
      return await Notification.updateMany(query, {isRead: true}, {new : true})
    } catch (e) {
      throw e
    }
  }
  
  async count(query){
    try {
      return await Notification.countDocuments(query)
    } catch (e) {
      throw e
    }
  }
  
  async find(query){
    try {
      return await Notification.find(query)
    } catch (e) {
      throw e
    }
  }
  
}

module.exports = new NotificationHelper()