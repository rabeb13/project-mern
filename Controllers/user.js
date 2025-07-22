const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async ( req, res) => {
    try {
        // req.body => newUser
const {name, email, password, phone} = req.body;
const foundUser = await User.findOne({email});
if (foundUser) {
    return res.status(400).send({msg: " Email should be uniqe try again"});
}
const saltRounds = 10;
const hashedPassword = await bcrypt.hash(password, saltRounds);
// const newUser
const newUser = new User ( { ...req.body});
newUser.password = hashedPassword;
// save the user
await newUser.save();
// creation token 
const token = jwt.sign(
    {
        id: newUser._id,
    },
    process.env.SECRET_KEY,
    {expiresIn: "1h"}
);

res.status(200).send({msg: "Register succ..", user: newUser, token });
    } catch (error) {
        res.status(400).send({msg: " can not register !!", error });
    }
};

exports.login = async (req, res) => {
try { 
    const { email, password } = req.body;
// check if email exist
const foundUser = await User.findOne({ email });
if (!foundUser) {
    return res.status(400).send({msg: "Bad credential !!!"});
}

const checkPassword = await bcrypt.compare(password, foundUser.password);
if (!checkPassword) {
    return res.status(400).send({msg: "Bad credential !!!"});
}
// creation token 
const token = jwt.sign(
    {
        id: foundUser._id,
    },
    process.env.SECRET_KEY,
    {expiresIn: "1h"}
);
res.status(200).send({msg: "Login succ..", user: foundUser, token});
} catch(error) {
    res.status(400).send({msg: `can not login ${error}` });
}
};