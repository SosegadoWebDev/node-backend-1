const { response } = require("express");
const User = require('../models/user');
const Hospital = require('../models/hospital');
const Doctor = require("../models/doctor");

const getDataByTextToFind = async (req, res = response) => {
    const textToFind = req.params.textToFind || '';
    const regex = new RegExp(textToFind, 'i');

    // Find
    const userQuery = User.find({ name: regex });
    const hospitalQuery = Hospital.find({ name: regex });
    const doctorQuery = Doctor.find({ name: regex });
    const [usersResults, hospitalResults, doctorResults] = await Promise.all([userQuery, hospitalQuery, doctorQuery])

    res.json({
        ok: true,
        textToFind,
        data: { usersResults, hospitalResults, doctorResults }
    });
};

const getCollectionDataByTextToFind = async (req, res = response) => {
    const collection = req.params.collection;
    const textToFind = req.params.textToFind || '';
    const regex = new RegExp(textToFind, 'i');
    let result;

    switch (collection) {
        case 'hospitales':
            result = await Hospital.find({ name: regex })
                .populate('user', 'name img');
            break;
        case 'medicos':
            result = await Doctor.find({ name: regex })
                .populate('user', 'name img');
            break;
        case 'users':
            result = await User.find({ name: regex });
            break;
        default:
            return res.status(400).json({
                ok: false,
                msg: 'Error, a valid collection is expected.'
            });
    }

    res.json({
        ok: true,
        textToFind,
        data: result
    });
};

module.exports = { getDataByTextToFind, getCollectionDataByTextToFind };