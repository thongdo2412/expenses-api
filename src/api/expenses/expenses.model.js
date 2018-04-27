const BaseModel = require('../base.model')
const { getUUID } = require('../../helpers/utils.helpers')
const _ = require('lodash')

class ExpensesModel extends BaseModel {
  //query based on email address
  get_expense (key) {
    return this.get(key)
  }
  // add new item
  post (data) {
    return this.put(data)
  }

}

module.exports = ExpensesModel
