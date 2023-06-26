const {encryptPw} = require("../../utility/crypt");
const UsersCollection = require('../../models/user.model');

const signupController= async(req,res)=>{
    const{name,email,employeeId,password}=req.body;
    try{
     const user = await UsersCollection.findOne({email,employeeId})
     if(user){
        return res.status(400).json({
             status:"fail",
             message:"User already Exist"
         })
     }
     const hashPw = await encryptPw(password);
     const createUser= await UsersCollection.create({
         name,
         email,
         password:hashPw,
         employeeId 
     })
     if(!createUser||createUser.length<1){
         return res.status(400).json({
              status:"fail",
             message:"Can't able to create user"
         })
     }
     res.status(200).json(createUser)
    }catch(err){
     res.status(500).json({
         status:"fail",
         message:err.message
     })
    }
 }
 module.exports=signupController