const mongoose = require('mongoose')
const Schema = mongoose.Schema

const urlSchema = new Schema({
  // 完成後得查查，schema 內有哪些 type，能做些啥了...
  originURL: {
    type: String,
    required: true,
  },
  shortURL: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('URL', urlSchema)
