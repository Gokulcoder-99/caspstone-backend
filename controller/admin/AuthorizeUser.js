const UsersCollection = require("../../models/user.model");


const AuthorizeUserController = async (req, res) => {
  const { employeeId } = req.body;
  //noOfMonthsFoodAccess -will give no.of months meals needed
  try {
    const userFound = await UsersCollection.findOne({employeeId});
    if (!userFound) {
      return res
        .status(404)
        .send({ type: "error", msg: "No such user available" });
    }
 

  
    userFound.isVerified = true;
 
    await userFound.save();

 
    
    res.send({
      type: "success",
      msg: "User Verified",
    });
  } catch (err) {
    return res.status(500).send({ type: "error", msg: err.message });
  }
};

module.exports = AuthorizeUserController;
