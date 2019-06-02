const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const api = require('./server/routes/api')
let session = require('express-session')

const app = express()
const SESSION_SECRET = "palkfuyendvshegwuhewj"
// used to encrypt the session - kill application session dies - dont ever keep in your code! must be safe and encrypted

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// use sessions for tracking logins
app.use(session({
  name: "qid",
  // default is id - so makign it diffrent people wont know from cookie name which library youre using
  secret: SESSION_SECRET,
  // can be anything
  resave: false,
  // saves session after every change, dont need to resave session everytime user comes to the site
  saveUninitialized: true
  // saves uninititalized objects, dont store anything baout the user or create a cookie until i store some data on them
}));

app.use('/', api)



const port = 3000
app.listen(port, function () {
  console.log(`Running server on port ${port}`)
})