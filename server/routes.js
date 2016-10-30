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

  app.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/api/user')
  })

  app.get('/api/user', (req, res) => {
    if (req.user) {
      res.json({ loggedIn: true, user: req.user, flash: req.flash()})
    } else { // We have logged out...
      res.json({loggedIn: false, flash: req.flash()})
    }
  })

  app.route('/api/recordings')
    .get((req, res) => {
      res.json({description: 'query the recordings'})
    })
    .post(isLoggedIn, (req, res) => {
      res.json({description: 'create a recording'})
    })
}

function isLoggedIn (req, res, next) {
  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
    return next()

  // if they aren't redirect them to the home page
  res.type('json').status(401).send({error: 'User is not logged in.'})
}
