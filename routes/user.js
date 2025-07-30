// 1 require express
const express = require('express');
const { register, login } = require("../Controllers/user");
const {
    registerValidation,
    validation,
    loginValidation,
} = require('../midlleware/validation');
const isAuth = require('../midlleware/isAuth');

// 2 const router
const router = express.Router();
// route user (register & login)

// register
router.post("/register", registerValidation(), validation,register);

// login 
router.post("/login", loginValidation(), validation, login);

// current user
router.get("/current", isAuth, (req, res) => {
    res.send(req.user);
});

//3 export
module.exports = router;
