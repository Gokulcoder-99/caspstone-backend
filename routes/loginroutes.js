const express = require('express');
const router = express.Router();
const signupController = require('../controller/auth/siginupController');
const signinController = require("../controller/auth/signinController")

router.post("/signup",signupController)
router.post("/signin",signinController)
 
module.exports=router