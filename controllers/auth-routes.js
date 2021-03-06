const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/login', (req, res) => {
  res.render('login.ejs')
})
router.get('/login/success', (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: "user has authenticated",
      user: req.user

    })
  }
});

router.get('/logout', (req, res) => {
  // res.send('logging out')
  req.logout()
  // res.redirect('http://localhost:3001/welcome')
  res.redirect('/');
})

router.get('/dexcom', passport.authenticate('oauth2', {
  // session: true
  // scope: ['profile']
}))

router.get('/dexcom/redirect', passport.authenticate('oauth2'), (req, res) => {
  // res.send(req.user)
  // res.redirect('http://localhost:3001/welcome')
  res.redirect('/profile')
})


module.exports = router