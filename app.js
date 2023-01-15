const express = require('express')
const exphbs = require('express-handlebars')

const routes = require('./routes/index') // 可不寫 /index，因為預設會去找它
require('./config/mongoose')

const port = process.env.PORT || 3000
const app = express()

// (下2) 之後來試 局部改掉裡面東西，例如把其中一個 'handlebars' 改成 aaa
// 試的結果：只要不是全部一起改 (連同 extname 一起)，就會出錯，至少代表他們各有意義，啥意思，就得再查了
// app.engine('handlebars', exphbs({ defaultLayout: 'main' })) // 安裝 hbs 舊版本寫法
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' })) // 安裝 hbs 新版本寫法
app.set('view engine', 'handlebars')
app.use(express.static('pics'))
app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))
app.use(routes) // 使用 routes 導入所有路由設定

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})

// module.exports = port // 原本想匯出，結果有 circular dependency 問題，之後再試
