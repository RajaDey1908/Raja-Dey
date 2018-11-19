var Student = require('../models/student');
var config = require('../config/database');


module.exports.signup = function (req, res, next) {


    var newStudent = new Student({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        class: req.body.class,
        age: req.body.age
    });

    Student.createStudent(newStudent, function (err, user) {
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