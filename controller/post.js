const busboy = require('busboy')
const { PostHelper } = require('../helper')
const AwsUtils = require('../utils/s3')
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
        console.log(`Field [${name}]: value: %j`, val);
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
}

module.exports = new Post()