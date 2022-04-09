const express = require('express');
const router = express.Router()

const {UserHelper} = require('../helper')

router.post('/find',async (req,res)=>{
  let query = req.body
  try {
    let user = await UserHelper.find(query)
    res.status(200).send(user)
  } catch (e) {
    console.log(e)
    res.status(500).send({error: e.message})
  }
})

module.exports = router