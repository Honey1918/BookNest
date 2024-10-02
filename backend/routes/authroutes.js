const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const jwt = require('jsonwebtoken');

require('dotenv').config();

const bcrypt= require('bcrypt');
router.post('/signup', async (req, res) => {
    console.log('sent by client', req.body);
    const { name, email, password, dob, address } = req.body;

    if (!email || !password || !name || !dob || !address) {
        return res.status(422).send({ error: "Please fill all the fields" });
    }

    try {
        const savedUser = await User.findOne({ email: email });
        if (savedUser) {
            return res.status(422).send({ error: "Invalid credentials" });
        }

        const user = new User({
            name,
            email,
            password,
            dob,
            address
        });

        await user.save();
        // res.send({
        //     message: "USER SAVED SUCCESSFULLY"
        // });
        const token= jwt.sign({_id:user._id}, process.env.JWT_SECRET);
        res.send({token});
    } catch (err) {
        console.log( err);
        //return res.status(422).send({ error: err.message });
    }
})

router.post('/signin', async (req, res)=>{
    const {email, password}= req.body;
    if(!email || !password){
        return res.status(422).json({error: "Please add email or password"});
    }
    const savedUser= await User.findOne({email:email})
    if(!savedUser){
        return res.status(422).json({error:"Invalid credentials"});
    }

    try{
        bcrypt.compare(password, savedUser.password, (err, result)=>{
            if(result){
                console.log("Password match");
                const token= jwt.sign({_id:savedUser._id}, process.env.JWT_SECRET);
                res.send({token});
            }
            else{
                console.log('Password does not match');
                return res.status(422).json({error:"Invalid credentials"});
            }
        })
    }
    catch(err){
        console.log(err);
    }
})

module.exports = router;
