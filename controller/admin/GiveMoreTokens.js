const UsersCollection = require("../../models/user.model");


const GiveMoreTokens = async (req, res) => {
  const { employeeId,tokenRequested } = req.body;
  //noOfMonthsFoodAccess -will give no.of months meals needed
  try {
    if (!employeeId || !tokenRequested) {
      return res
        .status(404)
        .send({ type: "error", msg: "No userId-params available" });
    }
    const userFound = await UsersCollection.findOne({employeeId});
    if (!userFound) {
      return res
        .status(404)
        .send({ type: "error", msg: "No such user available" });
    }
    //below updating document

    

    
    let max = tokenRequested ;
    

    //saving it in usersCollection doc by adding with already available token counts
    userFound.TokensMax += max;
    
    
    //if token updated,now change isTokensRequested [field] to false
    userFound.isTokensRequested = false;

    //save data
    await userFound.save();


    //send response
    res.send({
      type: "success",
      msg: "User Verified and sent verification mail to that user",
    });
  } catch (err) {
    return res.status(500).send({ type: "error", msg: err.message });
  }
};

module.exports = GiveMoreTokens;
