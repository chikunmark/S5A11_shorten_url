const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

// (下1) 尚未做 routes refactoring，先不用它
// const routes = require('./routes/index') // 可不寫 /index，因為預設會去找它
require('./config/mongoose')

const port = process.env.PORT || 8080
const app = express()

// 之後來試 局部改掉裡面東西，例如把其中一個 'handlebars' 改成 aaa
// app.engine('handlebars', exphbs({ defaultLayout: 'main' })) // 舊版本寫法
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' })) // 新版本寫法
app.set('view engine', 'handlebars')
app.use(express.static('pics'))

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
// app.use(routes) // 開始 refactor 後再把 routes 打開

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`App is running on http://localhos:${port}`)
})
