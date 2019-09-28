const router = require('express').Router()
const passport = require('passport')

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    let io = req.app.get('socketio')
    io.emit('news', {'hello': 'world'})
    const obj = {msg: 'It works!'}
    res.json(obj)
})

module.exports = router