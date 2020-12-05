require('dotenv').config()

const express = require('express')

const router = require('./router')

const bodyParser = require('body-parser')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

app.use(router)

// set port, listen for requests
const { PORT } = process.env
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})
