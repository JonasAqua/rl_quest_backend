var mongoose = require('mongoose')
const createId = require('../helper/createId')
const Profile = require('./Profile')

let userSchema = mongoose.Schema({
    identification: String,
    googleProvider: {
        type: {
            id: String,
            token: String
        },
        select: false
    }
})

userSchema.statics.findOrCreateUser = function(accessToken, profile, cb) {
    const that = this
    return this.findOne({'googleProvider.id': profile.id}, function(err, user) {
        if (err) {
            cb(err)
        }
        if (!user) {
            that.registerUser(accessToken, profile, cb)
        } else {
            cb(null, user)
        }
    })
}

userSchema.statics.registerUser = function(accessToken, profile, cb) {
    let id = createId()
    let user = new this({
        identification: id,
        googleProvider: {
            id: profile.id,
            token: accessToken
        }
    })
    user.save(err => {
        if (err) {
            cb(err)
        }
        Profile.registerProfile(id, profile.displayName, profile._json.picture, err => {
            if (err) {
                cb(err)
            }
            cb(null, user)
        })
    })
}

module.exports = mongoose.model('User', userSchema)
