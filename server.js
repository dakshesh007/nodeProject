const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 3000
const server = app.listen(PORT,()=>{
  console.log(`server stared on ${PORT}`);
});
const cookieParser = require('cookie-parser');

app.use(cookieParser())

const  {connection} = require('./utils/mongo.js')
connection()

app.use(express.json())

const middleware = require('./middleware/auth')
app.use('/user', middleware, require('./routes/users'))
app.use('/auth', require('./routes/authentication'))

app.get('/',(req,res)=>{
  res.send('Welcome to hacking world');
})
