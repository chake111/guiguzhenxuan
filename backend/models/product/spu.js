const mongoose = require('mongoose');

const spuImageSchema = new mongoose.Schema({
  imgName: String,
  imgUrl: String
});

const saleAttrValueSchema = new mongoose.Schema({
  saleAttrValueName: {
    type: String,
    required: true
  },
  isChecked: {
    type: Boolean,
    default: false
  }
});

const saleAttrSchema = new mongoose.Schema({
  baseSaleAttrId: {
    type: String,
    required: true
  },
  saleAttrName: {
    type: String,
    required: true
  },
  spuSaleAttrValueList: [saleAttrValueSchema]
});

const spuSchema = new mongoose.Schema({
  spuName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  category3Id: {
    type: Number,
    required: true
  },
  tmId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trademark',
    required: true
  },
  spuImageList: [spuImageSchema],
  spuSaleAttrList: [saleAttrSchema]
}, {
  timestamps: true
});

const Spu = mongoose.model('Spu', spuSchema);

module.exports = Spu;
