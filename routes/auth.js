const bcryptjs = require('bcryptjs');
const user = require('../mongooseSchema/user');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {

    const { email_id, password } = req.body;
    if(!email_id || !password) return res.json({
        error: true,
        message: "email_id or password missing...!!!"
    });

    const existingUser = await user.findOne({email_id: email_id});
    if(!existingUser) return res.json({
        error: true,
        message: "User does not exist"
    });

    const checkPass = await bcryptjs.compare(password, existingUser.password);
    if(!checkPass) return res.json({
        error: true,
        message: "Wrong password entered"
    });

    const token = await jwt.sign({
        _id: existingUser._id,
        exp: (Date.now()/1000 + (60*60))
    }, process.env.TOKEN_SECRET);

    return res.json({
        error: false,
        message: "logged in successfully",
        auth_token: token 
    })
}

const register = async (req, res) => {

    const { email_id, password } = req.body;
    if(!email_id || !password) return res.json({
        error: true,
        message: "email_id or password missing...!!!"
    });

    const existingUser = user.findOne({email_id: email_id});
    if(!existingUser) return res.json({
        error: true,
        message: "User already exists"
    });

    const salt = await bcryptjs.genSalt(10);
    const hashPass = await bcryptjs.hash(password, salt);

    const created = user.create({
        email_id: req.body.email_id,
        password: hashPass
    });

    if(created) return res.json({
        error: false,
        message: "user created successfully"
    });

    return res.json({
        error: true,
        message: "user could not be created"
    });
}

module.exports.login = login;
module.exports.register = register;