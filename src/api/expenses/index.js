module.exports = (router) => {
  const Controller = require('./expenses.controller')
  const controller = new Controller()

  router.post('/getexpenses', (req, res) => controller.get(req, res)) 
  router.post('/addexpense', (req, res) => controller.post(req, res))

  return router
}