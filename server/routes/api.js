const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get('/', function (req, res) {
    console.log('someone has come into the server')
    res.send("Welcome!")
})

router.post('/login', function(req, res){
    let username = req.body.username
    let password = req.body.password
    User.findOne({username: username}, function(err, user){
        if(err){
            console.log(err)
            return res.status(500).send()
        }
        if(!user){
            // user not found
            return res.status(404).send()
        }
        user.comparePassword(password, function(err, isMatch){
            if(isMatch && isMatch == true){
                // need to store the user in the session
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
            // firstName: req.body.firstName,
            // lastName: req.body.lastName
        })
        newUser.save(function(err, savedUser){
            if(err){
                console.log(err)
                return res.status(500).send()
            
            }
            return res.status(200).send()
        })
})

router.get('/dashboard', function(req, res){
    if(!req.session.user){
        // unauthorized
        return res.status(401).send()
    }
    else{
        let user = req.session.user
        User.find({}).exec(function(err, users){
        res.send({users, user})
    })
}})


router.get('/logout', function(req, res){
    req.session.destroy()
    return res.status(200).send()
})

router.put('/addFriend/:username/:friend', function(req, res){
User.findOneAndUpdate(req.params.username, {$push: {friends: req.params.friend}}, {new:true}).exec( function(err, userData){
    if(err){
        return res.send(err)
    }
    res.send(userData)
})
})


module.exports =router