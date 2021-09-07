const mongoose = require('mongoose')
const Schemaa = new mongoose.Schema({
  name: {
    type: String
  },
  Memory: String,
  name2_printed: String

})

const Model = mongoose.model('Memorica', Schemaa)
module.exports = { Model }
