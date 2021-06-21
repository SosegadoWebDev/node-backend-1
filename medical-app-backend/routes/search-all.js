const { Router } = require('express');
const { getDataByTextToFind, getCollectionDataByTextToFind } = require('../controllers/search-all');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get(
    '/:textToFind',
    [validateJWT],
    getDataByTextToFind
);

router.get(
    '/:collection/:textToFind',
    [validateJWT],
    getCollectionDataByTextToFind
);

module.exports = router;