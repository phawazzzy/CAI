var passport = require('passport');
var localStrategy = require('passport-local').Strategy
var User = require('../models/user');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use('local.signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done) {

    User.findOne({ 'email': email }, function(err, user) {
        if (err) {
            return done(err);
        }
        if (user) {
            req.flash('userExist', "email already Exist ")

            return done(null, false);

        }

        let newUser = new User();
        newUser.name = req.body.name;
        newUser.email = req.body.email;
        newUser.password = newUser.hashPassword(req.body.password);
        newUser.role = req.body.role;


        newUser.save(function(err) {
            if (err) {
                return done(err);
            }

            return done(null, newUser);
        })

    })
}))


passport.use('local.login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done) {

    User.findOne({ 'email': email }, function(err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            req.flash('loginError', "user Email not found")
            return done(null, false);

        };

        if (!user.validatePassword(req.body.password)) {
            req.flash("passwordError", "incorrect password")
            return done(null, false)
        };
        return done(null, user)

    })
}))


// admin authentication

passport.use('local.adminSignup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done) {

    User.findOne({ 'email': email }, function(err, user) {
        if (err) {
            return done(err);
        }
        if (user) {
            req.flash('userExist', "email already Exist ")

            return done(null, false);

        }

        let newUser = new User();
        newUser.name = req.body.name;
        newUser.email = req.body.email;
        newUser.password = newUser.hashPassword(req.body.password);
        newUser.role = req.body.role;

        newUser.save(function(err) {
            if (err) {
                return done(err);
            }

            return done(null, newUser);
        })

    })
}))

passport.use('local.adminLogin', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done) {

    User.findOne({ 'email': email }, function(err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            req.flash('loginError', "user Email not found")
            return done(null, false);

        };

        if (!user.validatePassword(req.body.password)) {
            req.flash("passwordError", "incorrect password")
            return done(null, false)
        };
        return done(null, user)

    })
}))