const { response } = require("express");
const Hospital = require('../models/hospital');

const getHospitals = async (req, res = response) => {
    const hospitals = await Hospital.find()
        .populate('user', 'name')

    try {
        res.json({
            ok: true,
            data: hospitals
        })
    } catch (error) {
        res.json({
            ok: false,
            err: error
        })
    }
};

const updateHospital = (req, res = response) => {
    return res.json({
        ok: true,
        msg: 'updateHospital'
    });
};

const createHospital = async (req, res = response) => {
    const userId = req.uid;
    const hospital = new Hospital({
        user: userId,
        ...req.body
    });

    try {
        const hospitalSaved = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalSaved
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: error
        });
    }
};

const deleteHospital = (req, res = response) => {
    return res.json({
        ok: true,
        msg: 'deleteHospital'
    });
};

module.exports = { getHospitals, updateHospital, createHospital, deleteHospital };