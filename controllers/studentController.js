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

module.exports.update = function (req, res, next) {

    var newStudent = new Student({
        name: req.body.name,
        email: req.body.email
    });

    var id = req.params.id;
    //console.log(id);

    Student.findStudentById({
        _id: id
    }, function (err, student) {
        //console.log(student);
        if (err) {
            res.json({
                success: false,
                message: 'not success..'
            });
        } else {
            if (req.body.name) {
                student.name = req.body.name;
            }
            if (req.body.email) {
                student.email = req.body.email;
            }

            student.save(function (err, updateobject) {
                if (err) {
                    console.log();
                } else {
                    res.send(updateobject);
                }
            })
        }
    })
};


module.exports.studentupdate = function (req, res, next) {

    const doc = {
        name: req.body.name,
        email: req.body.email,
    };
    Student.update({
        _id: req.params.id
    }, doc, function (err, raw) {
        if (err) {
            res.send(err);
        }
        res.send(raw);
    });
}


module.exports.list = function (req, res, next) {

    Student.find({}, function (err, users) {
        var userMap = {};

        users.forEach(function (user) {
            userMap[user._id] = user;
        });

        res.send(userMap);
    });
}

module.exports.listById = function (req, res, next) {

    //var id = req.params.id;

    Student.findOne({
        _id: req.params.id
    }, function (err, story) {
        if (err) {
            console.log("errr", err);
            //return done(err, null);
        } else {
            res.send(story);
        }

    });
}

module.exports.delete = function (req, res, next) {

    Student.findByIdAndRemove(req.params.id, function (err, user) {
        if (err)
            throw err;
        else {
            if (user) {
                res.send(user);
            } else {
                res.json({
                    success: false,
                    message: 'No Student Found'
                });
            }
        }
        // delete user's projects
        // Projects.remove({ addedBy: user._id }, function (err) {
        //     console.log('deleting projects');
        //     if (err)
        //         throw err;
        //     // delete project references
        //     Users.update({}, { $pull: { projectId: { $in: user.projectId }}}, function (err) {
        //         console.log('deleting project references');
        //         if (err)
        //             throw err;
        //         res.json({ success: true, message: "Deleted" });
        //     });
        // });
    });
}