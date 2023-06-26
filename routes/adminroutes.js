const express = require('express');
const allUser = require('../controller/admin/allUser.js');
const allNotVerified = require('../controller/admin/allNotVerified.js')
const AuthorizeUserController = require('../controller/admin/AuthorizeUser.js')
const GetAllTokenRequestsController = require("../controller/admin/GetAllTokenRequests.js")
const GiveMoreTokensController = require("../controller/admin/GiveMoreTokens.js")
const adminRouter = express.Router();

adminRouter.get('/alluser',allUser)
           .get('/notverified',allNotVerified)
           .put("/authorizeUser", AuthorizeUserController)
           .get("/alltokenRequests", GetAllTokenRequestsController)
           .put("/giveMoreTokens", GiveMoreTokensController)
           

module.exports = adminRouter