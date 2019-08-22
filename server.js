// express
const express = require('express')
const app = express()

// controller routes
const authRoutes = require('./controllers/auth-routes')
const dataRoutes = require('./controllers/data-routes')

// passport
const passport = require('passport')
const passportSetup = require('./config/passport-setup')

// cookie session
const cookieSession = require('cookie-session')
const cors = require('cors');

// mongoose
const mongoose = require('mongoose')
const mongoURI = process.env.MONGODB_URI

//config .env
require('dotenv').config()

// cors whitelist
const whitelist = ['http://localhost:3001']
const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('NOT Allowed By Cors'))
    }
  }
}

// middleware
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.cookieKey]
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(cors(corsOptions))

// mongoose connect
mongoose.connection.once('open', () => {
  console.log(`connected to mongo`)
})
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})

app.use('/auth', authRoutes)
app.use('/data', dataRoutes)

// HOME

app.get('/', (req, res) => {
  res.render('home.ejs');
});

app.listen(process.env.PORT, () => {
  console.log(`listening on port... ${process.env.PORT}`);
})