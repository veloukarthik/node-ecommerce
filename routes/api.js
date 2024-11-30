const express = require("express");
const {login,register,importUsers} = require('../controllers/userController');

const router = express.Router();

//router user
router.get("/login",login);

router.get("/register",register);

router.get("/import-users",importUsers);

module.exports = router;