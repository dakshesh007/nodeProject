const jwt = require("jsonwebtoken")

class Tokens{
  generateToken(payload){
    return jwt.sign(payload, process.env.JWT_SECRET,{
      expiresIn: "1d"
    })
  }
  
  verifyToken(token){
    return jwt.verify(token, process.env.JWT_SECRET)
  }
}

module.exports = new Tokens()