const router = require('express').Router();
const authJWT = require('../middleware/jwt');

const {
    loginUser,
    TEST_SECURE_ENDPOINT
} = require('../controllers/users.controller')


router.route('/auth/login')
    .post(loginUser)

router.route('/auth/securetest')
    .get(authJWT, TEST_SECURE_ENDPOINT)

module.exports = router;