const UsersCollection = require("../../models/user.model");

const RequestMoreTokens = async (req, res) => {
  //this noOfMonthsExtra value can be from 1 to 12 (12 months)
  const { employeeId , tokenRequested } = req.body;
  try {
    //check for user available
    const userFound = await UsersCollection.findOne({employeeId});
    if (!userFound) {
      return res.status(404).json({ status: "fail", message: "No such user Found" });
    }
    //now user found,
    // "isTokensRequested" db fields
    userFound.isTokensRequested = true;
    userFound. tokenRequested = tokenRequested;
    //saving it in db
    await userFound.save();
    res.send({
      type: "success",
      msg: "Your request has been recorded...Admin will look into it soon",
    });
  } catch (err) {
    return res.status(500).json({ status: "fail", message: err.message });
  }
};

module.exports = RequestMoreTokens;
