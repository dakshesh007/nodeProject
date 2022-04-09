const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 3000
const server = app.listen(PORT,()=>{
  console.log(`server stared on ${PORT}`);
});

const  {connection} = require('./utils/mongo.js')
connection()

app.use(express.json())

app.use('/user', require('./routes/users'))
app.use('/auth', require('./routes/authentication'))

app.get('/',(req,res)=>{
  res.send('Welcome to hacking world');
})
