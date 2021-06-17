const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const getUsers = async (req, res) => {

    const users = await User.find({}, 'name email role google');

    res.status(202).json({
        ok: true,
        users,
        uid: req.uid
    });
}

const createUser = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const isEmailDuplicate = await User.findOne({ email })
        const user = new User(req.body);

        if (isEmailDuplicate) {
            return res.status(400).json({
                ok: false,
                msg: 'Email already exists'
            });
        }

        // Encrypt Password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();
        const token = await generateJWT(user.id);

        res.status(202).json({
            ok: true,
            user,
            token
        });

    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: 'Error'
        });
    }
}

const updateUser = async (req, res = response) => {
    const uid = req.params.id

    try {
        const userDB = User.findById(uid);

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'User doesnt exists'
            });
        }

        const { password, google, email, ...userObject } = req.body;

        if (userDB.email !== email) {
            const isEmailDuplicated = await User.findOne({ email: req.body.email });

            if (isEmailDuplicated) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Email already exists'
                });
            }
        }

        if (email) {
            userObject.email = email;
        }

        const userUpdated = await User.findByIdAndUpdate(uid, userObject, { new: true });

        res.json({
            ok: true,
            userUpdated
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error'
        })
    }
};

const deleteUser = async (req, res = response) => {
    const uid = req.params.id;

    try {
        const userDB = await User.findById(uid);

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'User doesnt exists'
            });
        }

        await User.findByIdAndDelete(uid);

        res.json({
            ok: true,
            id: 'User deleted'
        });
    } catch (error) {
        res.status(404).json({
            ok: false,
            id: uid
        });
    }

};

module.exports = { getUsers, createUser, updateUser, deleteUser };