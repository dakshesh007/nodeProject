const bcrypt = require('bcryptjs')

class Bcrypt{
  async encrypt(password){
    try {
      return await bcrypt.hash(password,10)
    } catch (e) {
      throw e
    }
  }
  
  async decrypt(password, hashPassword){
    try {
      return await bcrypt.compare(password,hashPassword)
    } catch (e) {
      throw e
    }
  }
}

module.exports = new Bcrypt()