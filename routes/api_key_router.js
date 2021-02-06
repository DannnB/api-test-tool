const express = require('express');
const app = require('../app');
const router = express.Router();

const { v4: uuidv4, validate: uuidValidate, version: uuidVersion } = require('uuid')
// UUID
// https://github.com/uuidjs/uuid
// secure api
//https://stackoverflow.com/questions/15496915/how-to-implement-a-secure-rest-api-with-node-js

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
module.exports = router;