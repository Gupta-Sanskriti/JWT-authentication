const router = require("express").Router();
const User = require("../models/user");
const jwt = require('jsonwebtoken')
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcrypt");
const user = require("../models/user");

// Routes
router.post("/register", async (req, res) => {
    // validating error
    const { error } = registerValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    // Check if the user is already in the database
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).send("email already exists");

    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    // Savng the user info
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPass,
    });
    try {
        const saveUser = await user.save();
        res.send({user:user._id});
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/login', async(req, res)=>{
    // Validate if the login content is valid or not
    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    // check email exists
    const user = await User.findOne({email: req.body.email});
    if(!user){
        return  res.status(400).send("email does not exists")
    }
    // console.log(user)
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) return res.status(400).send("password is not valid")

    // Create and assign token
    const token = await jwt.sign({_id: user._id},process.env.TOKEN_SECRET);
    res.header('auth-token',token).send(token)

    // res.status(200).send("success") -- commented this line because pd cannot set header after they are sent to client

})

module.exports = router;
