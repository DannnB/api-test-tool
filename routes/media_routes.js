const router = require('express').Router();
const authJWT = require('../middleware/jwt');

const {
    getMedia,
    addMedia,
    optionsMedia
} = require('../controllers/media.controller')


router.route('/media')
    .get(authJWT, getMedia)
    .post(authJWT, addMedia)
    .options(authJWT, optionsMedia)

module.exports = router;