const {decryptPw} = require('../../utility/crypt')
const UsersCollection = require("../../models/user.model")
const {signToken} = require('../../utility/jwt')



const signinController =async(req,res)=>{
    const{email,password}=req.body;
    try{
       const user = await UsersCollection.findOne({email});
       if(!user){
           return res.status(404).json({
               status:"fail",
               message:"User does not exist"
           })
       }
       const PwFromDb = user.password

       const checkPw = await decryptPw(password,PwFromDb);
       if(!checkPw){
           return res.status(200).json({
               status:"fail",
               message:"Password is incorrect"
           })
   
       }
       const userData={
       name:user.name,
       email,
       employeeId:user.employeeId,
       userRole:user.userRole,
       isVerified:user.isVerified,
       token:user.TokensMax
       }
       const tokenGenerated = signToken(userData);
       res.status(200).json({
           status:"success",
           tokenGenerated,
           userData
       })
    }catch(err){
       res.status(500).json({
           status:"fail",
           message:err.message
       })
    }
   }

   module.exports = signinController