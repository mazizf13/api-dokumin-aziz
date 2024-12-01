const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
} = require("./controller");

const uploadFolder = path.join(__dirname, "uploads");

// Memeriksa apakah folder 'uploads' ada, jika tidak, buat folder tersebut
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}

// Lanjutkan dengan konfigurasi multer seperti biasa
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder); // Simpan file ke folder 'uploads'
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Create document
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const document = await createDocument(req.body, req.file);
    res.status(201).json({
      status: "SUCCESS",
      message: "Document created successfully",
      data: document,
    });
  } catch (error) {
    res.status(400).json({ status: "FAILED", message: error.message });
  }
});

// Get all documents
router.get("/", async (req, res) => {
  try {
    const documents = await getDocuments();
    res.status(200).json({
      status: "SUCCESS",
      data: documents,
    });
  } catch (error) {
    res.status(400).json({ status: "FAILED", message: error.message });
  }
});

// Get document by ID
router.get("/:id", async (req, res) => {
  try {
    const document = await getDocumentById(req.params.id);
    res.status(200).json({
      status: "SUCCESS",
      data: document,
    });
  } catch (error) {
    res.status(404).json({ status: "FAILED", message: error.message });
  }
});

// Update document
router.put("/:id", async (req, res) => {
  try {
    const updatedDocument = await updateDocument(req.params.id, req.body);
    res.status(200).json({
      status: "SUCCESS",
      message: "Document updated successfully",
      data: updatedDocument,
    });
  } catch (error) {
    res.status(400).json({ status: "FAILED", message: error.message });
  }
});

// Delete document
router.delete("/:id", async (req, res) => {
  try {
    const deletedDocument = await deleteDocument(req.params.id);
    res.status(200).json({
      status: "SUCCESS",
      message: "Document deleted successfully",
      data: deletedDocument,
    });
  } catch (error) {
    res.status(404).json({ status: "FAILED", message: error.message });
  }
});

module.exports = router;
