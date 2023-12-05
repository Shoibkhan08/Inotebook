const express = require('express');
const User = require('../model/User');
const router = express.Router();
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser')
const JWT_SECRET = 'SHOIB_KHAN_12345678'


// create a user using: post "/api/auth/createuser". no login require
router.post('/createuser', [
    body('name', 'enter a valid name').isLength({ min: 3 }),
    body('email', 'enter a valid email').isEmail(),
    body('password', 'password most be atleast 5 characters').isLength({ min: 5 })

], async (req, res) => {
    //if there are errors, return bad request and the error
    let success = false;
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.send({success, errors: result.array() });
    }
    try {
        //check weather the user with with this email exists already
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            
            return res.send({success, errors: " sorry a user with this email already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const hashpass = await bcrypt.hashSync(req.body.password, salt);
        //create user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashpass
        });

        const data = {
            user: {
                id: user.id
            }
        };

        const authtoken = jwt.sign(data, JWT_SECRET)
        success = true
        res.json({ success,authtoken })

    } catch (result) {
        console.error(error.message)
        res.send("Some error occured")
    }
    console.log("welcome Create your Account")
})

//ROUTE 2 : login a user using: post "/api/auth/login". login require
router.post('/login', [
    body('email', 'enter a valid email').isEmail(),
    body('password', 'password most be atleast 5 characters').isLength({ min: 5 })],
    async (req, res) => {
        let success = false;
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.send({ errors: result.array() });
        }

        // let User = user.findOne({email: req.body.email});

        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email })
            if (!user) {
                success = false;
                return res.send({ error: 'invalid email please try login' });
            }
            const passwordcomp = await bcrypt.compare(password, user.password)
            if (!passwordcomp) {
                success = false;
                return res.send({ success, error: 'invalid password please try login' })
            }

            const data = {
                user: {
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.send({success, authtoken })

        } catch (error) {
            console.log({ error: "internel server error" })
            res.send({ error: "internel server error" })
        }

        console.log(req.body)
        console.log("Your Account is Login")
    })
//ROUTE 3: Get login User details using: POST"/api/auth/getuser" . login required

router.post('/getuser', fetchuser, async (req, res) => {

    try {
        userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.send({ error: "internel server error" })
    }
})
module.exports = router