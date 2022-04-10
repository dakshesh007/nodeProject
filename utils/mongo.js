const mongoose = require('mongoose')
const url = process.env.MONGO_URL
module.exports = () => {
  mongoose.connect(url,{
    useUnifiedTopology: true,
    useNewUrlParser: true
  }).
  then(()=>console.log("database connected")).
  catch((err)=>console.log("error==== ",err))
}

