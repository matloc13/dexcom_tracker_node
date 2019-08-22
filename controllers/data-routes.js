const express = require('express')
const router = express.Router()
const qs = require('querystring')
const http = require('https')

let body = {}

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.redirect('/auth/login')
  } else {
    next()
  }
}

router.get('/access', (req, res) => {
  console.log(req.user);

  // res.status(200).json(req.user)


  var options = {
    "method": "GET",
    "hostname": "api.dexcom.com",
    "port": null,
    "path": "/v2/users/self/dataRange",
    "headers": {
      "authorization": `"Bearer ${req.user.dexcomId}`,
    }
  };

  var req = http.request(options, (res) => {
    var chunks = []

    res.on("data", (chunk) => {
      chunks.push(chunk)
    })

    res.on("end", () => {
      body = Buffer.concat(chunks);
      console.log(body.toString());
    })
  })
  req.end();
  // res.render('info.ejs', {
  //   info: JSON.parse(body)
  // })
  res.status(200).json(body)
  // res.send(body.calibrations.toString())
})

module.exports = router