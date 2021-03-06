var userController = require('../controllers/userController');
var studentController = require('../controllers/studentController');

module.exports = function (app, passport) {

    var passport_auth = passport.authenticate('jwt', {
        session: false
    });

    /* for User portion*/
    app.get('/', userController.dashboard);

    app.post('/signup', userController.signup);

    app.post('/login', userController.login);

    app.get('/profile', passport_auth, userController.profile);

    app.get('/logout', userController.logout);

    app.put('/update', userController.update);

    app.delete('/delete', userController.delete);

    /* for student portion */

    app.post('/student', studentController.signup);

    app.put('/student/update/:id', studentController.update);

    app.put('/student/testupdate/:id', studentController.studentupdate);

    app.get('/students', studentController.list);

    app.get('/students/:id', studentController.listById);

    app.delete('/student/:id', studentController.delete);

}