const bcrypt = require("bcrypt");

const jwt = require('jsonwebtoken');
const { user } = require("../models");
const secret = process.env.JWT_SECRET;

const db = require("../models");
const User = db.user;
const Role = db.roles;

const uuidValidateV4 = uuid => {
    return uuidValidate(uuid) && uuidVersion(uuid) === 4;
}


// actions
const signupUser = (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        hash: bcrypt.hashSync(req.body.password, 8)
    })

    if(req.body.roles) {
        Role.find(
            {
                name: { $in: req.body.roles }
            },
            (err, roles) => {
                if(err) {
                    res.status(500).send({ message: err})
                    return;
                }

                user.roles = roles.map(role => role._id);
                
                user.save(err => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    res.send({ message: 'User was registered successfully!' })
                })
            }
        )
    } else {
        Role.findOne({ name: 'user'}, (err, role) => {
            if (err) {
                res.status(500().send({ message: err }))
                return;
            }

            user.roles = [role._id];
            user.save(err => {
                if (err) {
                    res.status(500).send({ message: err});
                    return;
                }

                res.send({ message: 'User was registered successfully!' })
            })
        })
    }
}
const loginUser = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({username});

    if(user == null) {
        return res.sendStatus(401);
    }
    bcrypt.compare(password, user.hash, (err, result) => {
        if (err || !result) {
            res.sendStatus(401);
        } else {
            jwt.sign({ id: user._id }, secret, { expiresIn: '24h' }, (err, token) => {
                    if (err) { res.sendStatus(500); }
                    else {
                        res.json({
                            success: true,
                            user: { username: user.username },
                            token
                        })
                    }
                })
        }
        
    })
}

const deleteUser = async (req, res) => {
    const { _id } = req.body;

    if (_id === undefined) return res.status(400).send({
        ok: false,
        message: 'User ID is required.'
    })

    User.deleteOne({_id: _id}, (err, user) => {
        if (err || !user.deletedCount) return res.status(404).send({
            ok: false,
            message: 'User not found'
        });

        res.send({
            ok: true,
            message: 'User deleted',
            user
        })
    })
}

const updateUser = async (req, res) => {
    const {id} = req.params;
    const { email, firstName, lastName, bio, 
        location, company, avatar, website, 
        social, roles }  = req.body;    
    const body = Object.entries(req.body)
    
    User.findOne({ _id: id }, (err, user) => {
        if (err) {
            res.status(500().send({ message: err }))
            return;
        }

        for (const [key, val] of body) {
            console.log(`${key} : ${val}`)
            // TODO: add a check if key exists in User
            user[key] = val
        }

        user.save(err => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            res.send({ message: 'User was updated successfully!', user })
        })
    })
}

const getUser = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).send({
            ok: false,
            message: 'User ID is required.'
        })
    }

    User.find({_id: req.params.id}, (err, user) => {
        if (err) return res.status(404).send({
            ok: false,
            message: 'User not found.'
        });

        res.send({
            ok: true,
            message: 'User Found.',
            user
        })
    })

    // try {
    //     console.log(await User.find({ _id: req.params.id }))
    //     // const user = await User.find({_id: req.params.id})
    // } catch (err) {
    //     res.status(500).send({ message: err });
    //     return;
    // }

    // if(!user) {
    //     return res.status(404).send({
    //         ok: false,
    //         message: 'User not found'
    //     })
    // }
    // return res.json(user[0])
}
const getUsers = async (req, res) => {
    const users = await User.find({});
    res.json(users);
}

module.exports = {
    signupUser,
    loginUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser,
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