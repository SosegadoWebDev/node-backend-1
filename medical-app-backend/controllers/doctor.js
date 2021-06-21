const { response } = require("express");
const Doctor = require("../models/doctor");

const getDoctor = async (req, res = response) => {
    const doctors = await Doctor.find()
        .populate('user', 'name email')
        .populate('hospital', 'name')

    return res.json({
        ok: true,
        data: doctors
    });
};

const updateDoctor = (req, res = response) => {
    return res.json({
        ok: true,
        msg: 'updateDoctor'
    });
};

const createDoctor = async (req, res = response) => {
    const userId = req.uid;
    const doctor = new Doctor({
        user: userId,
        ...req.body
    });

    try {
        const doctorSaved = await doctor.save();

        res.json({
            ok: true,
            doctor: doctorSaved
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: error
        });
    }
};

const deleteDoctor = (req, res = response) => {
    return res.json({
        ok: true,
        msg: 'deleteDoctor'
    });
};

module.exports = { getDoctor, updateDoctor, createDoctor, deleteDoctor };