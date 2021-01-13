const router = require('express').Router();

// auth login
router.get('/login', (req, res) => {
  res.render('login');
})

// auth logout
router.get('/logout', (req, res) => {
  //handle w passport
  res.render('logging out');
})


// auth with Google
router.get('/google', (req, res) => {
  //handle w passport
  res.send('logging in w google')
})


module.exports = router;