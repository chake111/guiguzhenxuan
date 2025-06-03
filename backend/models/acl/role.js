const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  roleName: {
    type: String,
    required: true,
    unique: true
  },
  remark: {
    type: String,
    default: ''
  },
  permissions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Permission'
  }]
}, {
  timestamps: {
    createdAt: 'createTime',
    updatedAt: 'updateTime'
  }
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
