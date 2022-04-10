const AWS = require("aws-sdk")
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET
})

class AwsUtils {
  async upload(params){
    return new Promise((resolve, reject)=>{
      s3.upload({Bucket: process.env.AWS_BUCKET_NAME,
      ...params
      },(err,data)=>{
        if(err) return reject(err)
        if(data && data.Location) return resolve(data.Location)
        else reject({message:"error in file upload"})
      })
    })
  }
}
  
  module.exports = new AwsUtils()