const mongoose = require('mongoose')
const shortId = require('shortid')

// Create schema.
const shortUrlSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true
  },
  short: {
    type: String,
    require: true,
    default: shortId.generate
  },
  clicks: {
    type: Number,
    required: true,
    default: 0
  }
})
// Export model.
module.exports = mongoose.model('ShortUrl', shortUrlSchema);
