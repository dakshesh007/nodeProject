const busboy = require('busboy')
const { PostHelper, LikeHelper } = require('../helper')
const AwsUtils = require('../utils/s3')
const constant = require('../constants')

class Post{
  async create(req,res){
    try {
      let url = []
      let uploadPayload = []
      let text = null
      let {_id} = req.user
      let totalFiles = 0
      const bb = busboy({ headers: req.headers });
      bb.on('file', async (name, file, info) => {
        totalFiles++
        const { filename, encoding, mimeType } = info;
        uploadPayload.push(
          AwsUtils.upload({
            Key : `${Date.now()}${filename}`,
            Body : file
          }))
          
          //url = await AwsUtils.upload()
      });
      bb.on('field', (name, val, info) => {
        if(name === "text"){
          text = val
        }
      });
      bb.on('finish', async () => {
        if(uploadPayload.length!= totalFiles) return
        let url = await Promise.all(uploadPayload)
        if(!url || !url.length) return res.status(401).send({error:"file not uploaded"})
        
        let createdPost = await PostHelper.add({
          user:_id,
          text,
          url,
        })
        
        if(!createdPost) return res.status(401).send({error:"faild to create new post"})
        
        res.send({
          post : createdPost
        })
        
      });
      req.pipe(bb);
    } catch (e) {
      res.status(500).send(e.message)
    }
  }
  
  async edit(req,res){}
  
  async like(req,res){
    try {
    const { post, type } = req.body
    const { _id:user } = req.user
    
    const postInfo = await PostHelper.findOne({
      _id: post,
      isDeleted: false
    })
    
    if(!postInfo) return res.status(401).send({
      error: "post not found or it is deleted."
    })
    
    switch (type) {
      case constant.POST.LIKE:
        await LikeHelper.likePost({
          user,
          post
        })
        break;
        case constant.POST.DISLIKE:
          await LikeHelper.disLikePost({
            user,
            post
          })
        break;
      default:
        return res.status(401).send({
          error:'invalid type'
        })
    }
    
    res.send({
      message:`successfully ${type === constant.POST.LIKE ? 'liked' : 'disliked' } on post`
    })
    
    } catch (e) {
      res.status(500).send({
        error: e.message
      })
    }
  }
}

module.exports = new Post()