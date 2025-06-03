const mongoose = require('mongoose');

const trademarkSchema = new mongoose.Schema({
  tmName: {
    type: String,
    required: true,
    unique: true
  },
  logoUrl: {
    type: String,
    required: true
  }
});

const Trademark = mongoose.model('Trademark', trademarkSchema);

module.exports = Trademark;
