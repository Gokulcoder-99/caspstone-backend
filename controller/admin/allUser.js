const UsersCollection = require('../../models/user.model')

const allUser =async(req,res)=>{
  try{
    const user = await UsersCollection.find(
        { userRole: "EMPLOYEE" }
    )
    if(!user || user.length<1){
        return res.status(404).json({
            status:'fail',
            message:'There is no user'
        })
    }
    res.status(200).json({
       status:"success",
       user  
    })
  }catch(err){
    return  res.status(500).json({
        status:"fail",
        message:err.message
    })
  }
}

module.exports = allUser