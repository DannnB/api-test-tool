const router = require('express').Router();
const authJWT = require('../middleware/jwt');
const verifySignUp = require('../middleware/verifySignUp')

const {
    signupUser,
    loginUser,
    getUsers,
    TEST_SECURE_ENDPOINT
} = require('../controllers/users.controller');

router.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
})
router.route('/auth/signup')
    .post([verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted], signupUser)

router.route('/auth/login')
    .post(loginUser)

router.route('/auth/securetest')
    .get(authJWT, TEST_SECURE_ENDPOINT)

router.route('/users')
    .get(authJWT, getUsers)

module.exports = router;