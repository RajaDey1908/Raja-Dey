var mongoose = require('mongoose');
var config = require('../config/database');
var bcrypt = require('bcryptjs');

var userSchema = mongoose.Schema({
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
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    }
});

var User = module.exports = mongoose.model('User', userSchema);

module.exports.getUserById = function (id, cb) {
    User.findById(id, cb);

}

module.exports.getUserByEmail = function (email, cb) {
    User.findOne({
        email: email
    }, cb);

}

module.exports.createUser = function (newUser, cb) {
    //console.log(newUser);
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(cb);
        })
    })

}

module.exports.comparePassword = function (myPassword, hash, cb) {
    bcrypt.compare(myPassword, hash, function (err, isMatch) {
        if (err) throw err;
        cb(null, isMatch)
    })

}


module.exports.updatedata = function (newUser, cb) {
    //console.log(newUser);
    User.findOneAndUpdate({
            email: newUser.email // search query
        }, {
            name: newUser.name // field:values to update           
        }, {
            new: true, // return updated doc
            runValidators: true // validate before update
        })
        .then(doc => {
            cb(doc, null);
        })
        .catch(err => {
            cb(null, err)
        })
}


module.exports.deletedata = function (newUser, cb) {
    //console.log(newUser);
    User.findOneAndRemove({
            email: newUser.email
        })
        .then(response => {
            console.log(response)
            cb(response, null);
        })
        .catch(err => {
            console.error(err)
            cb(null, err);
        })
}