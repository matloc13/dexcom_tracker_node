const passport = require('passport')
const OAuth2Strategy = require('passport-oauth2')
require('dotenv').config()
const User = require('../models/user')
const qs = require('querystring')
const http = require('https');;


passport.serializeUser((user, cb) => {
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
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    passReqToCallback: true
  }, (accessToken, refreshToken, profile, cb) => {
    // passport callback
    console.log('we got a response');
    // console.log(profile);
    // console.log(code);
    // console.log(accessToken);
    // console.log(refreshToken);
    console.log(cb);
    // new User({
    //   dexcomId: profile
    // }).save().then((newUser) => {
    //   console.log('new user created:' + newUser)
    //   cb(null, newUser)
    // }).catch((err) => console.error(err))
    // let options = {
    //   "method": "POST",
    //   "hostname": "api.dexcom.com",
    //   "port": null,
    //   "path": "/v2/oauth2/token",
    //   "headers": {
    //     "content-type": "application/x-www-form-urlencoded",
    //     "cache-control": "no-cache"
    //   }
    // }
    //
    // const req = http.request(options, (res) => {
    //   const chunks = []
    //
    //   res.on("data", (chunk) => {
    //     chunks.push(chunk)
    //     console.log(chunks)
    //   })
    //
    //   res.on("end", () => {
    //     let body = Buffer.concat(chunks)
    //     console.log(body.toString())
    //   })
    // })
    //
    // req.write(qs.stringify({
    //   client_secret: process.env.CLIENT_SECRET,
    //   client_id: process.env.CLIENT_ID,
    //   code: 4e0 bbf7fd260c89d6a9f3e27ce0ee2ae,
    //   grant_type: 4e0 bbf7fd260c89d6a9f3e27ce0ee2ae,
    //   redirect_uri: process.env.CALLBACK_URL
    // }))
    // req.end()

  })
)