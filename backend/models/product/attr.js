const mongoose = require('mongoose');

const attrValueSchema = new mongoose.Schema({
  valueName: {
    type: String,
    required: true
  },
  attrId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Attr'
  }
});

const attrSchema = new mongoose.Schema({
  attrName: {
    type: String,
    required: true
  },
  categoryId: {
    type: Number,
    required: true
  },
  categoryLevel: {
    type: Number,
    required: true
  },
  attrValueList: [attrValueSchema]
}, {
  timestamps: true
});

const Attr = mongoose.model('Attr', attrSchema);

module.exports = Attr;
