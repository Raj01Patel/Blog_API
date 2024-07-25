const express = require("express");
const router = express.Router();
const userController = require("../controller/userController")
const authMiddleware = require("../middlewares/authMiddleware")

router.post("/signup",userController.signUp);
router.post("/login",userController.login);
router.post("/logout",authMiddleware,userController.logout);

module.exports = router;