const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get('/', function (req, res) {
    console.log('someone has come into the server')
    res.send("Welcome!")
})
router.get('/checkSession', function(req, res){
    if(req.session.user){
        console.log(req.session.user)
        res.json({session: true})
    }
    else res.json({session: false})
})

router.post('/login', function(req, res){
    let username = req.body.username
    let password = req.body.password
    User.findOne({username: username}, function(err, user){
        if(err){
            console.log(err)
            return res.status(500).send('error')
        }
        if(!user){
            // user not found
            return res.status(404).send('user not found')
        }
        user.comparePassword(password, function(err, isMatch){
            if(isMatch && isMatch == true){
                req.session.user = user
                return res.send(user)
            }
            else {
                return res.status(401).send()
            }
        })
    })
})


router.post('/register', function(req, res){
        let newUser = new User({
            username: req.body.username,
            password: req.body.password,
            numLogIns: 0
        })
        newUser.save(function(err, savedUser){
            if(err){
                console.log(err)
                return res.status(500).send()         
            }
            return res.status(200).send(`username ${savedUser.username} created`)
        })
})

router.get('/dashboard', function(req, res){
    if(!req.session.user){
        // unauthorized
        return res.status(401).send()
    }
    else{
        res.send(req.session.user)
    }})


router.get('/logout', function(req, res){
    req.session.destroy()
    return res.status(200).send('logged out')
})

router.put('/update/:username', function(req, res){
    console.log(req.session)
  let logIns = req.session.user.numLogIns+1
  console.log(logIns)
User.findOneAndUpdate({username: req.params.username}, {numLogIns: logIns}, {new:true}).exec( function(err, userData){
    if(err){
        return res.send(err)
    }
    res.send(userData)
})
})


module.exports =router