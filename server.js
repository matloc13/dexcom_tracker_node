// express
const express = require('express')
const app = express()

// controller routes
const authRoutes = require('./controllers/auth-routes')
const dataRoutes = require('./controllers/data-routes')
const profileRoutes = require('./controllers/profile-routes')

// passport
const passport = require('passport')
const passportSetup = require('./config/passport-setup')

// cookie session
const cookieSession = require('cookie-session')
const cors = require('cors');

const Chart = require('chart.js')
const ChartjsNode = require('chartjs-node')

// mongoose
const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGODB_URI_LOCAL

//config .env
require('dotenv').config()
const moment = require('moment')
app.locals.format = (date) => {
  return moment(date).format('MMMM Do YYYY, h: mm: ss a')
}

// *** replace by setting options directly
// cors whitelist
// const whitelist = ['http://localhost:3000', 'http://localhost:3001']
// const corsOptions = {
//   origin: function(origin, callback) {
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       callback(null, true)
//     } else {
//       callback(new Error('NOT Allowed By Cors'))
//     }
//   }
// }

// middleware
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.COOKIE_KEY]
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(express.urlencoded({
  extended: false
}));
// app.use(cors({
//   origin: "http://localhost:3001",
//   methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
//   credentials: true,
//   preflightContinue: true
// }))
app.use(express.static('public'));

// mongoose connect
mongoose.connection.once('open', () => {
  console.log(`connected to mongo`)
})
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})

app.use('/auth', authRoutes)
app.use('/data', dataRoutes)
app.use('/profile', profileRoutes)

// HOME

app.get('/', (req, res) => {
  res.render('home.ejs', {
    user: req.user
  });
});

app.listen(process.env.PORT, () => {
  console.log(`listening on port... ${process.env.PORT}`);
})