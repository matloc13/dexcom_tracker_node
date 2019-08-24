const passport = require('passport')
const OAuth2Strategy = require('passport-oauth2')
require('dotenv').config()
const User = require('../models/user')
const qs = require('querystring')
const http = require('https')


passport.serializeUser((user, cb) => {
  // console.log(user);
  cb(null, user.id)
})

passport.deserializeUser((id, cb) => {
  User.findById(id).then((user) => {
    cb(null, user)
  })
})

passport.use(
  new OAuth2Strategy({
    // authorizationURL: process.env.SAND_AUTHORIZATION_URL,
    authorizationURL: `${process.env.AUTHORIZATION_URL}client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.CALLBACK_URL}&response_type=code&scope=offline_access&state=true`,
    // tokenURL: process.env.SAND_TOKEN_URL,
    tokenURL: process.env.TOKEN_URL,
    CLIENT_ID: process.env.CLIENT_ID,
    // clientID: process.env.CLIENT_ID_LOCAL,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    // clientSecret: process.env.CLIENT_SECRET_LOCAL,
    callbackURL: process.env.CALLBACK_URL,
    passReqToCallback: false,
    skipUserProfile: false
  }, (accessToken, refreshToken, profile, cb) => {
    // passport callback
    // console.log(accessToken);
    // console.log('accesToken ^^');
    // console.log(refreshToken);
    // console.log('refresh token ^^^');
    // console.log(profile);
    // console.log('profile ^^^');
    // console.log(cb);
    // console.log('callback ^^');

    User.findOne({
      username: 'matloc',
      dexcomId: accessToken
    }).then((cUser) => {
      if (cUser) {
        console.log('user is' + cUser.username)
        cb(null, cUser)
      } else {
        new User({
          username: 'matloc',
          dexcomId: accessToken,
          userRefreshToken: refreshToken
        }).save().then((newUser) => {
          console.log('new user created' + newUser.username)
          cb(null, newUser)
        })
      }
    })
  }))