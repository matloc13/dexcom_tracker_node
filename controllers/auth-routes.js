const express = require('express')
const router = express.Router()
const passport = require('passport')


router.get('/login', (req, res) => {
  res.render('login.ejs')
})

router.get('/logout', (req, res) => {
  res.send('logging out')
})

router.get('/dexcom', passport.authenticate('oauth2', {
  scope: ['offline_access']
}))

router.get('/dexcom/redirect', passport.authenticate('oauth2'), (req, res) => {
  res.send('signed in')
})

module.exports = router