const aws = require('aws-sdk');
const s3 = new aws.S3({ apiVersion: '2006-03-01' });
const lambda = new aws.Lambda({
  region: 'ap-southeast-2'
});

exports.handler = async (event, context) => {
  //s3 copy file
  const sourceBucket = event.Records[0].s3.bucket.name;
  const targetBucket = "yanyan-bucket-target";
  const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
  const copyparams = {
    Bucket : targetBucket,
    CopySource : sourceBucket + "/" + key,
    Key : key
  };
  try {
    await s3.copyObject(copyparams).promise();
    console.log('copy success');
  } catch (err) {
    console.log('err information', err);
    const message = `Error copying object ${key} from bucket ${sourceBucket}. Make sure they exist and your bucket is in the same region as this function.`;
    console.log(message);
    throw new Error(message);
  }

  // one lambda invoke another one
  lambda.invoke({
    FunctionName: 'yanyan-function',
    Payload: JSON.stringify(event, null, 2) // pass params
  }, function(error, data) {
    if (error) {
      console.log("another lambda error", error)
      context.done('error', error);
    }
    if(data.Payload){
      context.succeed(data.Payload)
    }
  });
};
