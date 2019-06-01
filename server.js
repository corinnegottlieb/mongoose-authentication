const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const api = require('./server/routes/api')
let session = require('express-session')

const app = express()

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// use sessions for tracking logins
app.use(session({
    secret: 'whatever',
    // can be anything
    resave: false,
    saveUninitialized: true
  }));

app.use('/', api)



const port = 3000
app.listen(port, function(){
    console.log(`Running server on port ${port}`)
})