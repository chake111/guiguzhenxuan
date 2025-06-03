const mongoose = require('mongoose');

const attrValueSchema = new mongoose.Schema({
  attrId: String,
  valueId: String
});

const saleAttrValueSchema = new mongoose.Schema({
  saleAttrId: String,
  saleAttrValueId: String
});

const skuSchema = new mongoose.Schema({
  skuName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  skuDesc: {
    type: String,
    default: ''
  },
  category3Id: {
    type: Number,
    required: true
  },
  skuDefaultImg: {
    type: String,
    required: true
  },
  tmId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trademark',
    required: true
  },
  spuId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Spu',
    required: true
  },
  skuAttrValueList: [attrValueSchema],
  skuSaleAttrValueList: [saleAttrValueSchema],
  isSale: {
    type: Number,
    default: 0 // 0: 下架, 1: 上架
  }
}, {
  timestamps: true
});

const Sku = mongoose.model('Sku', skuSchema);

module.exports = Sku;
