const fs = require('fs');

const User = require('../models/user');
const Hospital = require('../models/hospital');
const Doctor = require("../models/doctor");

const deleteImage = (path) => {
    // Check if the image exists
    if (fs.existsSync(path)) {
        // If exists, delete it
        fs.unlinkSync(path);
    }
};

const updateImage = async (collection, id, fileName) => {
    switch (collection) {
        case 'doctor':
            const doctor = await Doctor.findById(id);

            if (!doctor) {
                return false;
            }

            deleteImage(`./upload/doctor/${doctor.img}`);
            doctor.img = fileName;

            await doctor.save();
            return true;
        case 'hospital':
            const hospital = await Hospital.findById(id);

            if (!hospital) {
                return false;
            }

            deleteImage(`./upload/hospital/${hospital.img}`);
            hospital.img = fileName;

            await hospital.save();
            return true;
        case 'users':
            const user = await User.findById(id);

            if (!user) {
                return false;
            }

            deleteImage(`./upload/users/${user.img}`);
            user.img = fileName;

            await user.save();
            return true;
        default:
            break;
    }
};

module.exports = { updateImage };