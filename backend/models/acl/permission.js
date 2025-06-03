const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
  pid: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    required: true
  },
  select: {
    type: Boolean,
    default: false
  },
  children: {
    type: Array,
    default: []
  }
}, {
  timestamps: {
    createdAt: 'createTime',
    updatedAt: 'updateTime'
  }
});

const Permission = mongoose.model('Permission', permissionSchema);

module.exports = Permission;
