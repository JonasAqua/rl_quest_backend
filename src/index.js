const express = require('express')
const passport = require('passport')
const routeOptions = require('./options/routeOptions')
const passportConfig = require('./passportConfig')
const bodyParser = require('body-parser')
const mongooseConfig = require('./mongooseConfig')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
require('dotenv').config()

const port = process.env.PORT
console.log(port)
passportConfig()
mongooseConfig()

app.use(bodyParser.json())
app.use(passport.initialize())

routeOptions(app)

server.listen(port)
console.log('Application running on port ' + port)

app.set('socketio', io)

io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
      console.log(data);
    });
  });