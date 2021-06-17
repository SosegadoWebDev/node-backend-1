const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

router.get('/',validateJWT, getUsers);
router.post(
    '/',
    [
        check('name', 'name is required').not().isEmpty(),
        check('password', 'password is required').not().isEmpty(),
        check('email', 'email is required').isEmail(),
        validateFields
    ],
    createUser
);
router.put(
    '/:id',
    [
        validateJWT,
        check('name', 'name is required').not().isEmpty(),
        check('role', 'role is required').not().isEmpty(),
        check('email', 'email is required').isEmail(),
        validateFields
    ],
    updateUser
);

router.delete('/:id', validateJWT, deleteUser);

module.exports = router;