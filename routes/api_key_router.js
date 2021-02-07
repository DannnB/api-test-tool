const express = require('express');
const app = require('../app');
const router = express.Router();

const authJWT = require('../middleware/jwt');

const jwt = require('jsonwebtoken');
const PRIVATE_KEY_TEST = 'ainaf8392n020n9ge2n0iwgem'; // not a real key so good luck

const { v4: uuidv4, validate: uuidValidate, version: uuidVersion } = require('uuid')
// UUID
// https://github.com/uuidjs/uuid
// secure api
//https://stackoverflow.com/questions/15496915/how-to-implement-a-secure-rest-api-with-node-js
// https://medium.com/javascript-in-plain-english/securing-express-js-api-using-jwt-b2834325d2e8
// https://github.com/bewarusman/node-file-upload/blob/master/index.js

const uuidValidateV4 = uuid => {
    return uuidValidate(uuid) && uuidVersion(uuid) === 4;
}

router
.get('/apikey', async (req, res, next) => {
    res.send('GET rom /apikey')
})
.post('/apikey', async (req, res, next) => {
    const id = req.userId;
    const uuid = uuidv4();

    // check if 
    res.send(uuid);
})
.put('/apikey', async (req, res, next) => {
    res.send('PUT to /apikey')
});

router.post('/uuidvalidate', async (req, res, next) => {
    // test if it is a valid UUID
    const uuid = req.headers.uuid;
    const isValid = uuidValidateV4(uuid);

    // TODO: is user authed

    // is it valid
    if(isValid) {
        res.send({
            ok: true,
            message: 'UUID is v4 and valid.'
        })
    } else {
        res.status(403).json({
            ok: false,
            message: 'UUID is not valid or not using v4.'
        })
    }
})

// JWT
// Create JWT
router.post('/login', async (req, res, next) => {
    // /login an send user password and username

    // if username and pasword and user exists generate JWT and send back to user
    res.send('JWT')
})
// Varify JWT
router.get('/secure', authJWT, async (res, req, next) => {
    // example to get a user
    const { id } = req.params;
    const body = req.body;
    let result = await getAUser.find()
    res.send('Super secret stuff returns like a user details')
})
module.exports = router;