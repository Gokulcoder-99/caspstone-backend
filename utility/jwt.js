const jwt = require("jsonwebtoken");


const signToken = (data) => {
  const token = jwt.sign(data, process.env.TOKENSECRET, {
    expiresIn: "10h",
  });
  return token;
};

const verifyToken = async(token)=>{
  try{
    const verifyUser = await jwt.verify(token,process.env.TOKENSECRET);
    return verifyUser
  }catch(err){
    return null
  }
}
module.exports= {signToken,verifyToken}