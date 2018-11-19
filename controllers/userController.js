var jwt = require('jsonwebtoken');
var User = require('../models/user');
var config = require('../config/database');


module.exports.dashboard = function (req, res, next) {

    res.json('Welcom to my Node.js');

};

module.exports.signup = function (req, res, next) {

    var newUser = new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        username: req.body.username,
        age: req.body.age
    });

    User.createUser(newUser, function (err, user) {
        if (err) {
            res.json({
                success: false,
                message: 'user is not registered..'
            });
        } else {
            res.json({
                success: true,
                message: 'user is registered..'
            });
        }
    })
};

module.exports.login = function (req, res, next) {

    var email = req.body.email;
    var password = req.body.password;
    User.getUserByEmail(email, function (err, user) {
        if (err) throw err;
        if (!user) {
            return res.json({
                success: false,
                message: 'No user forund'
            });
        } else {
            User.comparePassword(password, user.password, function (err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    var token = jwt.sign(user.toJSON(), config.secret, {
                        expiresIn: 600000
                    });
                    res.json({
                        success: true,
                        token: 'JWT ' + token,
                        user: {
                            id: user._id,
                            email: user.email,
                            password: user.password
                        }
                    });
                } else {
                    return res.json({
                        success: false,
                        message: 'password does not match'
                    });
                }
            })
        }
    });
};


module.exports.profile = function (req, res, next) {

    res.json({
        "user": req.user
    });

};

module.exports.update = function (req, res, next) {

    var newUser = new User({
        email: req.body.email,
        name: req.body.name
    });
    User.updatedata(newUser, function (user, err) {

        if (err) {
            res.json({
                "err": err
            });
        }

        res.json({
            "user": user
        });

    });

};

module.exports.delete = function (req, res, next) {
    var newUser = new User({
        email: req.body.email
    });
    User.deletedata(newUser, function (user, err) {
        if (err) {
            res.json({
                "err": err
            });
        }
        res.json({
            "user": user
        });
    });
};


module.exports.logout = function (req, res, next) {

    req.logout();
    res.redirect('/');

};