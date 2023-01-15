const express = require('express')
const router = express.Router()
const url_schema = require('../../models/url_db_schema')

// 老實講，因為這 req 會沒事跑出來，所以用這種方式屏蔽掉，有點土法煉鋼
// http://localhost:3000/favicon.ico
router.get('/favicon.ico', (req, res) => {
  return
})

router.get('/:short', (req, res) => {
  const short = `http://localhost:3000/${req.params.short}`
  // console.log(short)
  // if (req.params.short === '') {
  //   return res.render('index')
  // } else {
  //   return url_schema
  //     .find()
  //     .lean()
  //     .then(urlArray => {
  //       const filtered = urlArray.find(url => url.shortURL.includes(short))
  //       if (filtered) {
  //         res.redirect(filtered.originURL)
  //       } else {
  //         return
  //       }
  //     })
  // }

  return url_schema
    .find({ shortURL: short }) // 直接找 key/value 怎這麼難用... 算了先不用
    .lean()
    .then(url => {
      res.redirect(`${url[0].originURL}`)
    })
})

module.exports = router
