const express = require('express')
const router = express.Router()

require('./expenses')(router)

module.exports = router