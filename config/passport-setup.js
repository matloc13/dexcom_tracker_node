const passport = require('passport')
const OAuth2Strategy = require('passport-oauth2')
require('dotenv').config()



passport.use(
  new OAuth2Strategy({
    authorizationURL: 'https://sandbox-api.dexcom.com/v2/oauth2/login?',
    // authorizationURL: 'https://api.dexcom/v2/oauth2/login?',
    tokenURL: 'https://sandbox-api.dexcom.com/v2/oauth2/token',
    // tokenURL: 'https://api.dexcom/v2/oauth2/token',
    redirect_uri: '/auth/dexcom/redirect',
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: '/auth/dexcom/redirect'
  }, (accessToken, refreshToken, profile, cb) => {
    // passport callback
    console.log(profile);
    console.log(accessToken);
    console.log(refreshToken);
  })
)