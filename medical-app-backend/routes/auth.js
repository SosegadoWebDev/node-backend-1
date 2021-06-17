const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post(
    '/',
    [
        check('password', 'password is required').not().isEmpty(),
        check('email', 'email is required').isEmail(),
        validateFields
    ],
    login
);

module.exports = router;