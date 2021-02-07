const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { v4: uuidv4, validate: uuidValidate, version: uuidVersion } = require('uuid')

const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const uuidValidateV4 = uuid => {
    return uuidValidate(uuid) && uuidVersion(uuid) === 4;
}


// actions
const loginUser = (req, res, next) => {
    // TODO: add user/password check in a database
    // create a random ID for testing
    const TEST_UUID = uuidv4();
    const uuidIsValid = uuidValidateV4(TEST_UUID);

    if (uuidIsValid) {
        jwt.sign(
            { id: TEST_UUID },
            secret,
            { expiresIn: '15s' },
            (err, token) => {
                if (err) { res.sendStatus(500); }
                else {
                    res.json({
                        success: true,
                        user: { uuid: TEST_UUID },
                        token
                    })
                }
            })
    } else {
        res.sendStatus(401)
    }
}

const TEST_SECURE_ENDPOINT = (req, res, next) => {
    const { uuid } = req.params;
    res.send('User is authed')
}
module.exports = {
    loginUser,
    TEST_SECURE_ENDPOINT
}



// const bcrypt = require("bcrypt");
// const mongoose = require("mongoose");
// const { v4: uuidv4, validate: uuidValidate, version: uuidVersion } = require('uuid')

// // https://www.comparitech.com/net-admin/secure-mongodb/
// // https://blog.jeremylikness.com/blog/2018-12-27_mongodb-on-windows-in-minutes-with-docker/


// const jwt = require('jsonwebtoken');
// const SECRET_KEY_TEST = 'ainaf8392n020n9ge2n0iwgem'; // not a real key
// const jwt_options = {
//     expiresIn: 10000
// }
// const uuidValidateV4 = uuid => {
//     return uuidValidate(uuid) && uuidVersion(uuid) === 4;
// }

// router.post('/jwt', (req, res) => {
//     const TEST_UUID = uuidv4();
//     const uuidIsValid = uuidValidateV4(TEST_UUID);
//     if (uuidIsValid) {
//         jwt.sign(
//             { id: TEST_UUID }, 
//             SECRET_KEY_TEST, 
//             { expiresIn: '10s'}, 
//             (err, token) => {
//             if(err) { res.sendStatus(500);}
//             else {
//                 res.json({
//                     success: true,
//                     user: { uuid: TEST_UUID},
//                     token
//                 })
//             }
//         })
//     } else {
//         res.sendStatus(401)
//     }
// })

// router.get('/securetest', authJWT, async (req, res) => {
//     const { uuid } = req.params;
//     res.send('User is authed')
// })
// module.exports = router;