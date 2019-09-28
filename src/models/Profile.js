const mongoose = require('mongoose')
const createId = require('../helper/createId')

let profileSchema = mongoose.Schema({
    userIdentification: String,
    name: String,
    picture: String,
    currentQuests: [String]
})

profileSchema.statics.registerProfile = function(userIdentification, name, picture, cb) {
    let profile = new this({
        userIdentification: userIdentification,
        name: name,
        picture: picture,
        currentQuests: []
    })
    profile.save(err => {
        if (err) {
            cb(err)
        }
        cb(null, profile)
    })
}

module.exports = mongoose.model('Profile', profileSchema)
