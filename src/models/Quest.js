const mongoose = require('mongoose')

let questSchema = mongoose.Schema({
    identification: String,
    ownerIdentification: String,
    location: {
        long: String,
        lat: String
    },
    title: String,
    description: String
})

module.exports = mongoose.model('Quest', questSchema)
