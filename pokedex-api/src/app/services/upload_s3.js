import AWS from 'aws-sdk';
import bluebird from 'bluebird';

const { ACCESS_KEY_ID, SECRET_ACCESS_KEY, AWS_REGION, S3_BUCKET, URL_BUCKET_IMAGES } = process.env;

class UploadS3 {
    async imageUpload (base64, name, trainerId){
        AWS.config.setPromisesDependency(bluebird);
        AWS.config.update({ accessKeyId: ACCESS_KEY_ID, secretAccessKey: SECRET_ACCESS_KEY, region: AWS_REGION });
        const s3 = new AWS.S3();
      
        const base64Data = new Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64');
      
    
        const type = base64.split(';')[0].split('/')[1];
      
        const key = `${trainerId}_${name}.${type}`;
    
        const params = {
          Bucket: S3_BUCKET,
          Key: key, // type is not required
          Body: base64Data,
          ACL: 'public-read',
          ContentEncoding: 'base64', // required
          ContentType: `image/${type}` // required. Notice the back ticks
        }

        try {
          await s3.putObject(params, (err) => {
            console.log(err);
          });
          
        } catch (error) {
           // console.log(error)
        }
        
        
        return `${URL_BUCKET_IMAGES}${key}`;
      }
}

export default new UploadS3();