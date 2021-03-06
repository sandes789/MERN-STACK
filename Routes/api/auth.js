const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')

//Item Model
const User = require('../../Models/User');
const { route } = require('./users');


// @route POST  api/items
router.post('/', (req, res) => {
    const { email, password } = req.body

    // Simple Validation
    if (!email || !password) {
        return res.status(400).json({
            msg: 'Enter all the fields'
        })
    }

    //Checking if there is already existing uers then res a message
    User.findOne({ email: email })
        .then(user => {
            if(!user) {
                return res.status(400).json({
                    msg: 'User does not exists in our Database'
                })
            }

            bcrypt.compare(password, user.password)
            .then(isMatch => {
                if (!isMatch) {
                    return res.status(400).json({
                        msg: 'Enter valid Credential'
                    })
                }

                // Sign the token .sign
                jwt.sign(
                    { id: user.id },
                    config.get('jwtSecret'),
                    (err, token) => {
                        if (err) throw err
                        res.json({
                            token,
                            user: {
                                id: user.id,
                                name: user.name,
                                email: user.email
                            }
                        })
                    }
                )
            })

        })
})

// @route Get api/auth/user
// Private
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user))
})


module.exports = router;

