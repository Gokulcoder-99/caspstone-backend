const employeeRouter = require('express').Router();
const GenerateTokenController = require('../controller/employee/GenerateToken');
const RequestMoreTokensController = require('../controller/employee/RequestMoreTokens');
const GetUserTokensController = require('../controller/employee/GetUserTokens');
const myHistroy = require('../controller/employee/myhistroy');


employeeRouter.post("/generateToken", GenerateTokenController)
              .put("/requestmoretokens", RequestMoreTokensController)
              .post("/myTokens", GetUserTokensController)
              .post('/myHistroy',myHistroy)


module.exports=employeeRouter