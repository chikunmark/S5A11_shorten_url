// const port = require('../app')
// (上1) 把 app.js 的 port 號引入，失敗，說 module exports inside circular dependency
// 之後再試
const port = 3000 // 上面的替代

// 產生亂碼
function sample(collection) {
  let randomIndex = Math.floor(Math.random() * collection.length)
  return collection[randomIndex]
}

function shortURL(originURL) {
  // define things user might want
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase() // 變大寫
  const numbers = '1234567890'
  let shortURL = `http://localhost:${port}/` // shortURL 的起始值
  let url = {
    originURL: `${originURL}`,
    shortURL: '',
  }

  // create a collection to store things user picked up
  let collection = []
  collection = collection.concat((lowerCaseLetters + upperCaseLetters + numbers).split(''))
  // console.log(collection) // 檢查用 ok

  // start generating shortURL (按 collection 字數產生)
  for (let i = 0; i < 5; i++) {
    shortURL += sample(collection)
  }

  // console.log(shortURL) // 檢查是不是輸出一段網址，OK

  url.shortURL = shortURL

  // return URL
  return url
}

// shortURL() // 自用時測試

// export shortURL function for other files to use
module.exports = shortURL
