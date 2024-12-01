const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DocumentSchema = new Schema({
  name: { type: String, required: true },
  filePath: { type: String, required: true },
  fileType: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Document = mongoose.model("Document", DocumentSchema);

module.exports = Document;
