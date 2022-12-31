const express = require('express')
const router = express.Router()
const url_schema = require('../../models/url_db_schema')
const shortenStep = require('../../controllers/shorten_process')

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
  const originURL = req.body.originURL
  console.log('originURL是：', originURL)

  // 結果還是沒有試成 .exist()，或是把 DB 內的 value 取出來用，完成後繼續試
  url_schema
    .find()
    .lean()
    .then(urlArray => {
      const filtered = urlArray.find(url => url.originURL.includes(originURL))
      // (上1) 不知為何，當 originalURL === ''，find() 會回傳第一個 element -> 得再查了...
      console.log(Boolean(filtered)) // 測試 true/false
      if (filtered) {
        return res.render('index', { shortURL: filtered.shortURL })
      } else {
        const urlResult = shortenStep(originURL)
        console.log(urlResult)
        return url_schema
          .create(urlResult) // 寫得很爛，命名再改好一點
          .then(res.render('index', { shortURL: urlResult.shortURL }))
          .catch(err => console.error(err))
      }
    })

  // 嘗試用 .exist() 還是沒用...
  // const testExist = url_schema.exists({ originURL: originURL })
  // console.log(testExist)
  // if (testExist) console.log('data exists')

  // url_schema
  //   .findOne({ originURL: originURL })
  //   .lean()
  //   .then(url => {
  //     console.log(Boolean(url.originURL)) // 檢查 bool，但在檢查之前就讀不下去了...
  // if (url.originURL === originURL) {
  //   console.log('已經有了')
  //   return res.render('index', { shortURL: url.shortURL })
  // } else {
  //   const urlResult = shortenStep(originURL)
  //   url_schema
  //     .create(urlResult) // 寫得很爛，命名再改好一點
  //     .then(res.render('index', { shortURL: urlResult.shortURL }))
  //     .catch(err => console.error(err))
  // }
  // })
  // const test = url_schema.find({ originURL: originURL }).lean()
  // console.log('測試結果如下')
  // console.log(test)
  // 被我改得亂七八糟 /////////////////////////
  // console.log(Boolean(url_schema.findOne({ original: originURL })))
  // const urlCheck = url_schema
  //   .findOne({ originURL: originURL })
  //   .lean()
  //   .then(url => console.log('url試試試試試', url.shortURL))
  // console.log('urlCheck 結果如下')
  // console.log(typeof urlCheck)
  // if (urlCheck) {
  //   console.log('已經有了')
  //   return urlCheck
  //     .then(url => {
  //       res.render('index', { shortURL: url.shortURL })
  //     })
  //     .catch(err => console.error(err))
  // } else {
  // }
  // 被我改得亂七八糟 end ////////////////////////////

  // const urlResult = shortenStep(originURL)
  // console.log(urlResult)
  // return url_schema
  //   .create(urlResult) // 寫得很爛，命名再改好一點
  //   .then(res.render('index', { shortURL: urlResult.shortURL }))
  //   .catch(err => console.error(err))
})

module.exports = router
