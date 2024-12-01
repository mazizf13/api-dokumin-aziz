const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const {
  getFolders,
  createFolder,
  renameFolder,
  deleteFolder,
  uploadFile,
} = require("./controller");

// Get all folders
router.get("/", async (req, res) => {
  const { userId, folderType } = req.query;
  try {
    console.log("Received Query Parameters:", { userId, folderType });
    const folders = await getFolders(userId, folderType);
    console.log("Fetched Folders:", folders);
    res.status(200).json(folders);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Create a new folder
router.post("/", async (req, res) => {
  const { name, userId, folderType } = req.body;
  try {
    const folder = await createFolder(name, userId, folderType);
    res.status(201).json(folder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rename a folder
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { newName } = req.body;
  try {
    const folder = await renameFolder(id, newName);
    res.status(200).json(folder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a folder
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteFolder(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Upload a file
router.post("/:id/upload", upload.single("file"), async (req, res) => {
  const { id } = req.params;
  try {
    const folder = await uploadFile(id, req.file);
    res.status(200).json(folder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
