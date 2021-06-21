const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { updateImage } = require("../helpers/update-image");
const path = require('path');
const fs = require('fs');

const fileUpload = (req, res = response) => {
    const { collection, id } = req.params;
    const validCollections = ['hospital', 'doctor', 'users'];

    // Validate collection
    if (!validCollections.includes(collection)) {
        return res.status(400).json({
            ok: false,
            msg: 'Error, a valid collection is expected.'
        });
    }

    // Validate non-empty files
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No files uploaded.'
        });
    }

    const file = req.files.image;
    const fileName = file.name.split('.');
    const extensionFile = fileName[fileName.length - 1];

    // Validate file extension
    const validExtensions = ['png', 'jpg', 'jpeg', 'gif'];

    if (!validExtensions.includes(extensionFile)) {
        return res.status(400).json({
            ok: false,
            msg: 'Invalid extension.'
        });
    }

    // Generate file name
    const newFileName = `${uuidv4()}.${extensionFile}`;

    // Move file
    const path = `./upload/${collection}/${newFileName}`;

    file.mv(path, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                msg: 'Error moving image.'
            });
        }

        // Update DB 
        updateImage(collection, id, newFileName);

        res.json({
            ok: true,
            msg: 'File uploaded.',
            newFileName
        });
    });
};

const getImage = (req, res = response) => {
    const { collection, imageId } = req.params;
    let pathImg = path.join(__dirname, `../upload/${collection}/${imageId}`);

    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        pathImg = path.join(__dirname, `../upload/no-img.jpg`);

        res.sendFile(pathImg);
    }
};

module.exports = { fileUpload, getImage };