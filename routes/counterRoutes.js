const counterRouter = require("express").Router();
const verifyTokenController = require('../controller/counter/verifyToken')

counterRouter.post("/verifyToken", verifyTokenController);

module.exports=counterRouter