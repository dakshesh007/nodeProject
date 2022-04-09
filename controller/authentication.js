const {UserHelper,BecryptHelper} = require("../helper")
class Authentication {
  async login(req,res){
    try {
      const {userName, password} =req.body
      
      if(!userName || !password) return res.status(401).send({
        error:"please fill all required fields"
      })
      
      let user = await UserHelper.findOne({
        userName
      })
      
      if(!user) return res.status(401).send({
        error:"Invalid User Name"
      })
      let checkedPass = await BecryptHelper.decrypt(password,user.password)
      
      if(!checkedPass)return res.status(401).send({
        error:"Invalid Password"
      })
      
       res.send({ user })
      
    } catch (e) {
      res.status(500).send({
        error: e.message
      })
    }
  }
  async signup(req,res){
    try {
      const {userName, password, name} =req.body
      
      if(!userName || !password || !name) return res.status(401).send({
        error:"please fill all required fields"
      })
      
      let user = await UserHelper.findOne({
        userName
      })
      
      if(user) return res.status(401).send({
        error:"User Name already exist."
      })
      
      let hashedPass = await BecryptHelper.encrypt(password)
      
      user = await UserHelper.add({
        userName,
        name,
        password:hashedPass
      })
      
      if(!user) return res.status(401).send({
        error:"Faild to create user please try again later!"
      })
      
       delete user.password
       
       res.send({ user })
      
    } catch (e) {
      res.status(500).send({
        error: e.message
      })
    }
  }
}

module.exports = new Authentication()