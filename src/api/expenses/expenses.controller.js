const BaseController = require('../base.controller')
const ExpensesModel = require('./expenses.model')

class ExpensesController extends BaseController {
  constructor () {
    super()
    this.model = new ExpensesModel()
  }

  get (req, res) {
    return this.model.get_expense(req.body.email)
    .then(data => this.success(res,data))
    .catch(err => this.error(res, err))
  }

  post (req, res) {
    return this.model.post(req.body)
    .then(data => this.success(res, data))
    .catch(err => this.error(res, err))
  }

  
}

module.exports = ExpensesController