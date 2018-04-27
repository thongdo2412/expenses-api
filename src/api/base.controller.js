const { responseSuccess, responseError } = require('../helpers/responses.helpers')
const log = require('../config/expenses').log

class BaseController {
  constructor() {
    this.log = log
  }

  success(req, body) {
    return responseSuccess(req, body)
  }

  error(req, body) {
    this.log.error(body)
    return responseError(req, body)
  }
}

module.exports = BaseController
