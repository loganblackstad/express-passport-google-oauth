const router = require('express').Router();
const passport = require('passport');



// auth login
router.get('/login', (req, res) => {
  res.render('login');
})

// auth logout
// on logout, set session cookie equal to null
router.get('/logout', (req, res) => {
  //handle w passport
  req.logout();
  req.session = null;
  res.redirect('/home');
  // res.render('logging out');
})


// auth with Google
router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}))

// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  // res.send(req.user)
  res.redirect('/profile')
})


module.exports = router;