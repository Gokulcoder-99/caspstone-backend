const adminCheck = async(req,res,next)=>{
   const{userRole}=req.userVerified;
   try{
     if(!userRole){
        return res.status(404).json({
            status:"fail",
            message:"userRole in admincheck not found"
        })
     }
     if(userRole==="ADMIN"){
        next()
     }else{
        return res.status(400).json({
            status:"fail",
            message:"You are not allowed"
        })
     }
   }catch(err){
    res.status(500).json({
        status:"fail",
        message:err.message
    })
   }
   
}

module.exports=adminCheck