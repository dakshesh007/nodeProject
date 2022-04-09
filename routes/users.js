const express = require('express');
const router = express.Router()

const {UserHelper} = require('../helper')

router.post('/add',async (req,res)=>{
  let paylod = req.body
  try {
    let user = await UserHelper.add(paylod)
    res.status(201).send(user)
  } catch (e) {
    console.log(e)
    res.status(500).send({error: e.message})
  }
})

module.exports = router