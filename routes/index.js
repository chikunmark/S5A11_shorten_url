const express = require('express')
const router = express.Router()

const home = require('./modules/home') // 首頁路由設定
const other = require('./modules/other') // 其他頁面路由設定

router.use('/', home) // 使用 (導入) home
router.use(other) // 使用 (導入) other

module.exports = router
