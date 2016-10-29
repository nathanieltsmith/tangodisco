module.exports = function (app, passport) {
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/api/user', // redirect to the secure profile section
    failureRedirect: '/api/user', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }))

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/api/user', // redirect to the secure profile section
    failureRedirect: '/api/user', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }))

  app.get('/logout', function (req, res) {
    req.logout()
    res.redirect('/api/user')
  })

  app.get('/api/user', function (req, res) {
    if (req.user) {
      res.json({ loggedIn: true, user: req.user, flash: req.flash()})
    } else { // We have logged out...
      res.json({loggedIn: false, flash: req.flash()})
    }
  })
}
