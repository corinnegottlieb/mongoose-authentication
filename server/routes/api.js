const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get('/', function (req, res) {
    console.log('someone has come into the server')
    res.send("Welcome!")
})
router.get('/checkSession', function(req, res){
    if(req.session.user){
        console.log(req.session)
        res.json({session: true,
        user: req.session.user})
    }
    else res.send({session: false})
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
                console.log(req.sessionID)
                req.session.user = user
                req.session.userId = user._id
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
            numLogIns: 1
        })
        newUser.save(function(err, user){
            if(err){
                console.log(err)
                return res.status(500).send()         
            }
            else{
                req.session.userId = user._id
            return res.status(200).send(`username ${user.username} created`)}
        })
})

router.get('/dashboard', function(req, res){
    if(!req.session.userId){
        // unauthorized
        return res.status(401).send()
    }
    else{
        User.findById(req.session.userId, function(err, user){
        res.send(user)
    })}
})


router.get('/logout', function(req, res){
    req.session.destroy()
    return res.status(200).send('logged out')
})

router.put('/update/:username', function(req, res){
    console.log(req.session)
//   let logIns = req.session.user.numLogIns+1
//   console.log(logIns)
User.findByIdAndUpdate(req.session.userId, { $inc: { numLogIns: 1 } }, {new:true}).exec( function(err, userData){
    if(err){
        return res.send(err)
    }
    console.log(userData)
    res.send(userData)
})
})


module.exports =router