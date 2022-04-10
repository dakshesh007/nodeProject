require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')

app.use(cookieParser())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

/* initialize mongo database connection */
require('./utils/mongo.js')()

//app.use(express.json({
 // limit:'8mb'
//}))

const auth = require('./middleware/auth')
app.use('/user', auth, require('./routes/users'))
app.use('/auth', require('./routes/authentication'))
app.use('/post', auth, require('./routes/post'))

app.get('/',(req,res)=>{
  res.send('Welcome to hacking world');
})

const server = app.listen(PORT,()=>{
  console.log(`server stared on ${PORT}`);
});
