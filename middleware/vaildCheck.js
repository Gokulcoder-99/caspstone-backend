const {verifyToken} = require("../utility/jwt");

const vaildCheck = async(req,res,next)=>{
    const { authorization } = req.headers;
    try {
      if (!authorization) {
        return res.status(404).json({
            status:"fail",
            message:"No token available"
        });
      }
    const token = authorization.split(" ")[1];
    const {name,email,employeeId,userRole,isVerified} = await verifyToken(token);
    if(!email){
        return res.status(400).json({
            status:"fail",
            message:"Token was expired"
        })
 }
   req.userVerified={
    name,
    email,
    employeeId,
    userRole,
    isVerified
   };
    next()
}catch(err){
    res.status(500).json({
        status:"fail",
        message:err.message
    })
}
 }

module.exports = vaildCheck