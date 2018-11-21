var mongoose = require('mongoose');
var config = require('../config/database');
var bcrypt = require('bcryptjs');


var studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: {
            unique: true,
            dropDups: true
        },
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    class: {
        type: String,
            required: true
    },
    age: {
        type: String,
        required: true
    }
});

var Student = module.exports = mongoose.model('students', studentSchema);

module.exports.getStudentById = function (id, cb) {
    Student.findById(id, cb);

}

module.exports.createStudent = function (newStudent, cb) {

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newStudent.password, salt, function (err, hash) {
            if (err) throw err;
            newStudent.password = hash;
            newStudent.save(cb);
        })
    })

}


module.exports.findStudentById = function (id, cb) {
    Student.findById(id, cb);

}