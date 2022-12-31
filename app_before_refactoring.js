const express = require('express')
const exphbs = require('express-handlebars')
const shortenStep = require('./controllers/shorten_process')
const url_schema = require('./models/url_db_schema')

// (下1) 尚未做 routes refactoring，先不用它
// const routes = require('./routes/index') // 可不寫 /index，因為預設會去找它
require('./config/mongoose')

const port = process.env.PORT || 3000
const app = express()

// 之後來試 局部改掉裡面東西，例如把其中一個 'handlebars' 改成 aaa
// app.engine('handlebars', exphbs({ defaultLayout: 'main' })) // 安裝 hbs 舊版本寫法
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' })) // 安裝 hbs 新版本寫法
app.set('view engine', 'handlebars')
app.use(express.static('pics'))

app.use(express.urlencoded({ extended: true }))
// app.use(routes) // 開始 refactor 後再把 routes 打開

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
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

// 老實講，因為這 req 會沒事跑出來，所以用這種方式屏蔽掉，有點土法煉鋼
// http://localhost:3000/favicon.ico
app.get('/favicon.ico', (req, res) => {
  return
})

app.get('/:short', (req, res) => {
  const short = `http://localhost:${port}/${req.params.short}`
  console.log(short)
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

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})

module.exports = port
