const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema(
  {
    originalName: { type: String, required: true },
    path: { type: String, required: true },
    downloadCount: { type: Number, required: true, default: 0 },
    size: { type: Number, required: true },
    type: { type: String, required: true },
    password: String,
  },
  { timestamps: true },
);

const fileModel = mongoose.model('File', fileSchema);

module.exports = fileModel;
