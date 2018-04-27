const config = require('../config/expenses')
const moment = require('moment')
const _ = require('lodash')
const { getVAT } = require('../helpers/utils.helpers')

const AWS = config.AWS
const log = config.log
const db = new AWS.DynamoDB.DocumentClient()

class BaseModel {
  constructor() {
    this.config = config
    this.log = log
    this.tableName = this.config.db.tables.expenses.name
    this.partitionKey = this.config.db.tables.expenses.partition
    this.sortKey = this.config.db.tables.expenses.sort
    if (!this.tableName) throw new Error('Missing required db table name')
  }

  put (data) {
    const item = _.extend({'added_date': moment().utc().format(),'VAT': getVAT(data.value)}, data)
  
    const params = {
      TableName: this.tableName,
      Item: item
    }
    this.log.debug(`BaseModel.put(): params: ${JSON.stringify(params)}`)

    return db.put(params).promise()
  }

  get (key) {
    const current_date = moment().utc().format()
    const params = {
      TableName: this.tableName,
      KeyConditionExpression: '#hk = :hkey and #rk < :rkey',
      ExpressionAttributeNames:{
        "#hk": "email",
        "#rk": "added_date"
      },
      ExpressionAttributeValues: {
        ':hkey': key,
        ':rkey': current_date
      }
    }
    this.log.debug(`BaseModel.query(): params: ${JSON.stringify(params)}`)

    return db.query(params).promise()
  }

}

module.exports = BaseModel