const counterCheck = async(req,res,next)=>{
    const {userRole}=req.userVerified;
    try{
        if(!userRole){
            return res.status(404).json({
                status:"fail",
                message:"userRole is not found in counterCheck"
            })
        }
        if(userRole==="COUNTER"){
            next()
        }else{
            return res.status(400).json({
                status:"fail",
                message:"Your not allowed "
            })
        }

    }catch(err){
        res.status(500).json({
            status:"fail",
            message:err.message
        })
    }
}

module.exports=counterCheck