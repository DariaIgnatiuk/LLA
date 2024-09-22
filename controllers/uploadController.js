// controllers/uploadController.js
const path = require('path');

exports.uploadFile = (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    // File uploaded successfully
    res.status(200).send(`File uploaded: ${req.file.filename}`);
};
