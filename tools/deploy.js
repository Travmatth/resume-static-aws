#! /usr/bin/env node
const path = require('path');
const s3 = require('s3');
const s3Opts = require('../aws.js');

var client = s3.createClient({
  s3Options: {
    accessKeyId: s3Opts.ACCESS_KEY_ID,
    secretAccessKey: s3Opts.SECRET_ACCESS_KEY,
    region: s3Opts.REGION,
    sslEnabled: true,
    //endpoint: 's3.yourdomain.com',
    // any other options are passed to new AWS.S3()
    // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
  },
});

var params = {
  localDir: path.resolve('dist'),
  deleteRemoved: true, // default false, whether to remove s3 objects
  // that have no corresponding local file.

  s3Params: {
    Bucket: s3Opts.BUCKET,
    ACL: 'public-read',
    // other options supported by putObject, except Body and ContentLength.
    // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
  },
};

var uploader = client.uploadDir(params);
uploader.on('error', err => console.error('Unable to sync:', err.stack));
uploader.on('end', () => console.log('Done Uploading'));
