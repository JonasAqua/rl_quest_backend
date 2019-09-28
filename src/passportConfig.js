const passport = require('passport')
const GoogleTokenStrategy = require('passport-google-token').Strategy
const User = require('./models/User')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.JWT_SECRET
console.log(process.env)
console.log(opts.secretOrKey)

function passportConfig() {
    passport.use(new GoogleTokenStrategy({
        clientID: '790306165997-qmd0kj4hujfhh5vd7c3dlkjnsnngjn0i.apps.googleusercontent.com',
        clientSecret: process.env.CLIENT_SECRET
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOrCreateUser(accessToken, profile, done)
    } 
    ));

    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        console.log(jwt_payload)
        User.findOne({identification: jwt_payload.id}, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));
}

module.exports = passportConfig
