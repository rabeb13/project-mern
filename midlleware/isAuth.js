const jwt = require('jsonwebtoken');
const User = require('../models/User');

const isAuth = async (req, res, next) => {
    try {
        // token => headers
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).send({ msg: "You are not authorized 1" });
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const foundUser = await User.findOne({_id: decoded.id});
    if (!foundUser) {
        return res.status(401).send({ msg: "You are not authorized 2" });
    }
    req.user = foundUser;
    next();
} catch (error) {
        res.status(401).send({ msg: "You are not authorized 3", error });
    }
};
module.exports = isAuth;