const { response } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const login = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const userDB = await User.findOne({ email });

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'email - password invalid'
            });
        }

        // Verify Password
        const isValidPassword = bcrypt.compareSync(password, userDB.password);

        if (!isValidPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'email - password invalid'
            });
        }

        // JWT
        const token = await generateJWT(userDB.id);

        res.json({
            ok: true,
            token: token,
            msg: 'login works'
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            err: error,
            msg: 'error at logging'
        });
    }
};

module.exports = { login };