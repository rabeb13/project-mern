const jwt = require('jsonwebtoken');
const User = require('../models/User');

const isAuth = async (req, res, next) => {
    try {
        // token => headers
        const token = req.headers['Authorization'];
        if (!token) {
            return res.status(401).send({ msg: "You are not authorized" });
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const foundUser = await User.findOne({_id: decoded.id});
    if (!foundUser) {
        return
    }
    req.user = foundUser;
    next();
} catch (error) {
        res.status(401).send({ msg: "You are not authorized", error });
    }
};
module.exports = isAuth;