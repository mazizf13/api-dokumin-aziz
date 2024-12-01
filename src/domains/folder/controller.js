const Folder = require("./model");
const fs = require("fs");
const path = require("path");

const getFolders = async (userId, folderType) => {
  try {
    const folders = await Folder.find({ userId, folderType });
    return folders;
  } catch (error) {
    throw error;
  }
};

const createFolder = async (name, userId, folderType) => {
  try {
    const newFolder = new Folder({ name, userId, folderType });
    await newFolder.save();
    return newFolder;
  } catch (error) {
    throw error;
  }
};

const renameFolder = async (folderId, newName) => {
  try {
    const folder = await Folder.findById(folderId);
    if (!folder) throw new Error("Folder not found!");

    folder.name = newName;
    await folder.save();
    return folder;
  } catch (error) {
    throw error;
  }
};

const deleteFolder = async (folderId) => {
  try {
    const folder = await Folder.findById(folderId);
    if (!folder) throw new Error("Folder not found!");

    await folder.remove();
    return { message: "Folder deleted successfully!" };
  } catch (error) {
    throw error;
  }
};

const uploadFile = async (folderId, file) => {
  try {
    const folder = await Folder.findById(folderId);
    if (!folder) throw new Error("Folder not found!");

    const uploadPath = path.join(__dirname, "../../uploads", folderId);
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    const filePath = path.join(uploadPath, file.originalname);
    fs.writeFileSync(filePath, file.buffer);

    folder.files.push({ name: file.originalname, path: filePath });
    await folder.save();

    return folder;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getFolders,
  createFolder,
  renameFolder,
  deleteFolder,
  uploadFile,
};
