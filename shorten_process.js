// sample a element in collection
// start generating PW
// Math.random，產生 0 <= n < 1 的數字
function sample(collection) {
  // if (collection.length === 0) {
  //   return // 先不管漂亮與否，這個 return 本身就會回傳 undefined，講師寫的才好
  // }
  let randomIndex = Math.floor(Math.random() * collection.length)
  return collection[randomIndex]
}

function generatePW(options) {
  // define things user might want
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase() // 變大寫
  const numbers = '1234567890'
  let pw = ''

  // define dummy data
  // 最後，只要把 options 註解掉，然後在 func 的參數加進'options' 即可
  // const options = {
  //   length: 12,
  //   lowercase: 'on',
  //   uppercase: 'on',
  //   numbers: 'on',
  //   excludeCharacters: '40',
  // }
  // console.log('options:', options)

  // create a collection to store things user picked up
  let collection = []
  collection = collection.concat((lowerCaseLetters + upperCaseLetters + numbers).split(''))
  console.log(collection)

  // // let lowerCaseArray = lowerCaseLetters.split('')
  // // collection = collection.concat(lowerCaseArray)

  // if (options.lowercase === 'on') {
  //   collection = collection.concat(lowerCaseLetters.split(''))
  // }

  // if (options.uppercase === 'on') {
  //   collection = collection.concat(upperCaseLetters.split(''))
  // }
  // if (options.numbers === 'on') {
  //   collection = collection.concat(numbers.split(''))
  // }

  // console.log(collection) // 檢驗用

  // return error notice if collection is empty
  if (collection.length === 0) {
    return `There is no valid character in your selection.`
  }

  // start generating PW (按密碼字數重複產生)
  for (let i = 0; i < options.length; i++) {
    pw += sample(collection)
  }

  // console.log('single PW', sample(collection))
  // console.log('final PW', pw)

  // return PW
  return pw
}

// generatePW() 自用時測試

// export generatePW function for other files to use
module.exports = generatePW
