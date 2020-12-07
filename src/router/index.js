const express = require('express')
const router = express.Router()
const gettingData = require('../controllers/gettingData')

/* GET home page. */

router.get('/', (req, res) => gettingData(req, res))
module.exports = router
