const LocalStrategy = require('passport-local').Strategy
import User from '../server/models/user'

module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user)
    })
  })


  passport.use('local-login', new LocalStrategy({
    passReqToCallback: true
  },
    function (req, username, password, done) {
      console.log('in callback', username, password)
      User.findOne({ 'username': username }, function (err, user) {
        console.log(err, user)
        if (err)
          return done(err)
        if (!user)
          return done(null, false); // req.flash is the way to set flashdata using connect-flash
        if (!user.validPassword(password))
          return done(null, false) // create the loginMessage and save it to session as flashdata
        return done(null, user)
      })
    }))

  passport.use('local-signup', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with username
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
  },

    function (req, username, password, done) {
      process.nextTick(function () {
        User.findOne({ 'username': username }, function (err, user) {
          if (err)
            return done(err)
          if (user) {
            return done(null, false, req.flash('signupMessage', 'That username is already taken.'))
          } else {
            const newUser = new User()
            newUser.username = username
            newUser.password = newUser.generateHash(password)
            newUser.save(function (err) {
              if (err)
                throw err
              return done(null, newUser)
            })
          }

        })

      })

    }))

}
