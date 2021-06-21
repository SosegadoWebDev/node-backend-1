const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const { fileUpload, getImage } = require('../controllers/upload');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();
router.use(expressFileUpload());

router.put(
    '/:collection/:id',
    [validateJWT],
    fileUpload
);

router.get(
    '/:collection/:imageId',
    getImage
);

module.exports = router;