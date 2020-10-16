const mongoose = require('mongoose')

const snips = new mongoose.Schema({
  numOfPastes: {
    type: Int32Array,
    required: true
  }
})

const snipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  code: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Snippet', snipSchema)
module.exports = mongoose.model('Snips', snips)