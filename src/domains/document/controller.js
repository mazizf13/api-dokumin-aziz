const Document = require("./model");
const path = require("path");
const fs = require("fs");

const createDocument = async (data, file) => {
  try {
    const { name } = data;
    const newDocument = new Document({
      name,
      filePath: file.path,
      fileType: file.mimetype,
    });
    const createdDocument = await newDocument.save();
    return createdDocument;
  } catch (error) {
    throw error;
  }
};

const getDocuments = async () => {
  try {
    const documents = await Document.find();
    return documents;
  } catch (error) {
    throw error;
  }
};

const getDocumentById = async (id) => {
  try {
    const document = await Document.findById(id);
    if (!document) {
      throw new Error("Document not found");
    }
    return document;
  } catch (error) {
    throw error;
  }
};

const updateDocument = async (id, data) => {
  try {
    const updatedDocument = await Document.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updatedDocument) {
      throw new Error("Document not found");
    }
    return updatedDocument;
  } catch (error) {
    throw error;
  }
};

const deleteDocument = async (id) => {
  try {
    const document = await Document.findByIdAndDelete(id);
    if (!document) {
      throw new Error("Document not found");
    }
    fs.unlinkSync(path.resolve(document.filePath));
    return document;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
};
