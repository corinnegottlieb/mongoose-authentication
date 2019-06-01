let mongoose = require('mongoose')
let bcrypt = require('bcrypt'),
SALT_WORK_FACTOR = 10


mongoose.connect('mongodb://localhost/usersDB', { useNewUrlParser: true })

let Schema = mongoose.Schema

let userSchema = new Schema({
    username: { type: String, unique: true },
    password: { type: String },
    firstName: String,
    lastName: String,
    friends: Array
})

// just before save run this function and give me the next function the call
userSchema.pre('save', function (next) {
    let user = this
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next()
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err)

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err)

            // override the cleartext password with the hashed onemptied
            user.password = hash
            next()
        })
    })
})

userSchema.methods.comparePassword = function(passwordInput, callback){
    bcrypt.compare(passwordInput, this.password, function (err, isMatch){
        callback(undefined, isMatch)
    })
}
const User = mongoose.model('User', userSchema)

module.exports = User;
