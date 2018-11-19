var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../models/user');
var Student = require('../models/student');
var config = require('../config/database');

module.exports = function (passport) {
    var opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.secret;
    // opts.issuer = 'accounts.examplesoft.com';
    // opts.audience = 'yoursite.net';
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        //console.log(jwt_payload)
        User.getUserById(jwt_payload._id, function (err, user) {
            console.log(user);
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });

        Student.getStudentById(jwt_payload._id, function (err, student) {
            console.log(user);
            if (err) {
                return done(err, false);
            }
            if (student) {
                return done(null, student);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });

    }));

}