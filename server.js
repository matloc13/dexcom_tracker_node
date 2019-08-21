// express
const express = require('express')
const app = express()

// controller routes
const authRoutes = require('./controllers/auth-routes')

// passport
const passport = require('passport')
const passportSetup = require('./config/passport-setup')

// cookie session
const cookieSession = require('cookie-session')

// mongoose
const mongoose = require('mongoose')
const mongoURI = process.env.MONGODB_URI

//config .env
require('dotenv').config()
const errorHandler = require('errorhandler')

// mongoose connect
mongoose.connection.once('open', () => {
  console.log(`connected to mongo`)
})
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})


// middleware
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.cookieKey]
}))
app.use(passport.initialize())
app.use(passport.session())
// app.use(errorHandler({
//   log: errorNotification
// }))
app.use('/auth', authRoutes)


// HOME

app.get('/', (req, res) => {
  res.render('home.ejs');
});

app.listen(process.env.PORT, () => {
  console.log(`listening on port... ${process.env.PORT}`);
})