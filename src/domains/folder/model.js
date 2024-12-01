const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
  name: String,
  path: String,
});

const FolderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: String, required: true },
  folderType: { type: String, enum: ["private", "public"], required: true },
  files: [FileSchema],
});

const Folder = mongoose.model("Folder", FolderSchema);

module.exports = Folder;
