/* @flow */
import validate from 'webpack-validator'
import merge from 'webpack-merge'
import S3Plugin from 'webpack-s3-plugin'
import productionBuild from './webpack.config.prod.babel'
import s3Opts from '../aws'

const config: WebpackConfiguration = validate(merge(productionBuild, {
  plugins: [
    new S3Plugin({
      s3Options: {
        accessKeyId: s3Opts.ACCESS_KEY_ID,
        secretAccessKey: s3Opts.SECRET_ACCESS_KEY,
        region: s3Opts.REGION,
      },
      s3UploadOptions: {
        Bucket: s3Opts.BUCKET,
      }
    })
  ]
})) 

export default config
