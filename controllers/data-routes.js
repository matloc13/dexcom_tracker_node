const express = require('express')
const router = express.Router()
const qs = require('querystring')
const http = require('https')


router.get('/range', (req, res) => {
  // console.log(req.user);

  let data = ''
  let options = {
    "method": "GET",
    "hostname": "api.dexcom.com",
    "port": null,
    "path": "/v2/users/self/dataRange",
    "headers": {
      "authorization": `Bearer ${req.user.dexcomId}`,
    }
  }
  let requ = http.request(options, (resp) => {
    let chunks = []

    resp.on("data", (chunk) => {
      data += chunk
    })

    resp.on("end", () => {
      // body = Buffer.concat(chunks)
      let body = JSON.parse(data)
      res.render('info.ejs', {
        data: body
      })
    })
  })
  requ.end()
  // res.send('hello')
})

router.get('/egvs', (req, res) => {
  let data = ''
  let options = {
    "method": "GET",
    "hostname": "api.dexcom.com",
    "port": null,
    "path": "/v2/users/self/egvs?startDate=2019-01-18T15:30:00&endDate=2019-03-18T15:45:00",
    "headers": {
      "authorization": `Bearer ${req.user.dexcomId}`,
    }
  }
  let requ = http.request(options, (resp) => {
    let chunks = []

    resp.on("data", (chunk) => {
      data += chunk
    })

    resp.on("end", () => {
      // body = Buffer.concat(chunks)
      let body = JSON.parse(data)
      // res.render('egvs.ejs', {
      //   data: body
      // })
      res.send(body)
    })
  })
  requ.end()
})

module.exports = router