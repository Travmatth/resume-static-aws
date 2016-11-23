/* @flow */
import merge from 'webpack-merge'
import validate from 'webpack-validator'
import S3Plugin from 'webpack-s3-plugin'
import productionBuild from 'webpack.config.prod.babel'

export default validate(merge(productionBuild, {
  plugins: [
    new S3Plugin({
      s3Options: {
        // accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        // secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        // region: 'HARDCODED'
      },
      s3UploadOptions: {
        // Bucket: 'HARDCODED'
      }
    })
  ]
}))
