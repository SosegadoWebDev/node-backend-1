const { Router } = require('express');
const { check } = require('express-validator');
const { getHospitals, updateHospital, createHospital, deleteHospital } = require('../controllers/hospital');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/', [], getHospitals);

router.post(
    '/',
    [
        validateJWT,
        check('name', 'Name is required').not().isEmpty(),
        validateFields
    ],
    createHospital
);

router.put('/:id', [], updateHospital);

router.delete('/:id', [], deleteHospital);

module.exports = router;