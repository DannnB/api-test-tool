const router = require('express').Router();
const authJWT = require('../middleware/jwt');

const {
    getMedia
} = require('../controllers/media.controller')


router.route('/media')
    .get(authJWT, getMedia)

module.exports = router;