const express = require('express')
const router = express.Router()
const qs = require('querystring')
const http = require('https')
const moment = require('moment')

let startDate = `2019-01-18`
let endDate = `2019-03-18`

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
        data: body,
        user: req.user
      })
    })
  })
  requ.end()
  // res.send('hello')
})

router.get('/devices', (req, res) => {
  let data = ''
  let options = {
    "method": "GET",
    "hostname": "api.dexcom.com",
    "port": null,
    "path": "/v2/users/self/devices?startDate=2019-06-10T08:00:00&endDate=2019-08-10T08:00:00",
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
      let body = JSON.parse(data)
      res.render('devices.ejs', {
        data: body,
        user: req.user
      });
      // res.send(body)
    })
  })
  requ.end()
})

router.post('/egvs', (req, res) => {
  console.log(req.body.startDate);
  let newStart = moment(req.body.startDate).format('YYYY-MM-DD')
  let newEnd = moment(req.body.endDate).format('YYYY-MM-DD')
  startDate = newStart
  endDate = newEnd
  res.redirect('/data/egvs');
});



router.get('/egvs', (req, res) => {

  let data = ''
  let options = {
    "method": "GET",
    "hostname": "api.dexcom.com",
    "port": null,
    "path": `/v2/users/self/egvs?startDate=${startDate}T12:00:00&endDate=${endDate}T12:00:00`,
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
      let sum = 0;
      let high = 1;
      let highIn;

      body.egvs.forEach((ele) => {
        int = Number(ele.value)

        sum += int
        if (int > high) {
          high = int
          highIn = ele.displayTime
        }
      })
      avg = Math.floor(sum / body.egvs.length)

      // const chartData = {
      //   labels: [],
      //   datasets: [{
      //     data: [],
      //   }],
      // }
      // const prepareBg = (bg) => {
      //   bg.egvs.forEach((ele) => {
      //     chartData.labels.push(ele.displayTime)
      //     chartData.datasets[0].data.push(ele.value)
      //   })
      //   return chartData
      // }
      // prepareBg(body)
      res.render('egvs.ejs', {
        avg: avg,
        high: high,
        highIn: highIn,
        body: body,
        // chartData: chartData,
        user: req.user
      })
      // res.send(body)
    })
  })
  requ.end()
})

module.exports = router