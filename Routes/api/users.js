const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config')
const jwt = require('jsonwebtoken')


//Item Model
const User = require('../../Models/User')


// @route POST  api/items
router.post('/', (req, res) => {
    const {name, email, password} = req.body
    
    // Simple Validation
    if(!name || !email || !password){
        return res.status(400).json({
            msg: 'Enter all the fields'
        })
    }

    //Checking if there is already existing uers then res a message
    User.findOne({ email: email})
    .then(user => {
        if(user){
            return res.status(400).json({
                msg: 'Email already exists in our Database'
            })
        }
        
        const newUser = new User({
            name,
            email,
            password
        })
        

        //Create salt & hash
         bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err
                newUser.password = hash
                newUser.save()
                .then(user => {

                    // Sign the token .sign
                    jwt.sign(
                        {id: user.id},
                        config.get('jwtSecret'),
                        (err, token) => {
                            if(err) throw err
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
    })
})


module.exports = router;

