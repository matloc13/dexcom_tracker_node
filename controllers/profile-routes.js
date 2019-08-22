const express = require('express')
const router = express.Router()

const authCheck = (req, res, next) => {
  if (!req.user) {
    // if user is not logged inspect
    res.redirect('/auth/login');
  } else {
    next()
  }
}

router.get('/', authCheck, (req, res) => {
  res.render('profile.ejs', {
    user: req.user
  });
});
module.exports = router