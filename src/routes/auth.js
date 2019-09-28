const router = require('express').Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')

router.post('/', passport.authenticate('google-token', {session: false}), (req, res, next) => {
    res.json(createToken(req.user.identification))
})

function createToken(id) {
    return jwt.sign({
        id: id
    }, 
    process.env.JWT_SECRET,
    {
        expiresIn: 60 * 120
    })
}

module.exports = router
