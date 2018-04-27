const AWS = require('aws-sdk')
const log = require('winston')
log.cli()
AWS.config.setPromisesDependency(require('bluebird'))
const awsRegion = process.env.AWS_DEFAULT_REGION || 'us-east-1'
AWS.config.update({region: awsRegion})
const inLambda = !!process.env.AWS_LAMBDA_FUNCTION_NAME

if (!inLambda) log.level = 'debug'

module.exports = {
  AWS,
  log,
  inLambda,
  version: require('../../package.json').version,
  prefix: '/api',
  db: {
    tables: {
      expenses: {
        name: process.env.EXPENSES_TABLE,
        partition: 'email',
        sort: 'added_date'
      }
    }
  },

}