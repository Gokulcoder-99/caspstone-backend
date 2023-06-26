const TokensCollection = require("../../models/Tokens");
const UsersCollection = require("../../models/user.model");

const GetUserTokensController = async (req, res) => {
  const { employeeId } = req.body;
  try {
    //check if user available
    const userFound = await UsersCollection.findOne({employeeId});
    if (!userFound) {
      return res
        .status(404)
        .json({ status: "fail", message: "No such user available" });
    }

    //fetch all user's tokens
    const userTokens = await TokensCollection.find({ employeeId });
    

    res.json({ status: "success", message: "All tokens fetched", userTokens });
  } catch (err) {
    return res.status(500).json({ status: "fail", message: err.message });
  }
};

module.exports = GetUserTokensController;
