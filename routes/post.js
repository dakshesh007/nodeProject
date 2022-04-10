const express = require('express');
const router = express.Router()
const postController = require('../controller/post')

router.post('/create',postController.create)

router.post('/edit',postController.edit)

router.post('/like',postController.like)

module.exports = router

