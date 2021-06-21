const { Router } = require('express');
const { check } = require('express-validator');
const { getDoctor, updateDoctor, createDoctor, deleteDoctor } = require('../controllers/doctor');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

router.get('/', [validateJWT], getDoctor);

router.post(
    '/',
    [
        validateJWT,
        check('name', 'Name is required').not().isEmpty(),
        check('hospital', 'hospital is required').not().isEmpty(),
        check('hospital', 'hospital must have a valid id').isMongoId(),
        validateFields
    ],
    createDoctor
);

router.put('/:id', [], updateDoctor);

router.delete('/:id', [], deleteDoctor);

module.exports = router;