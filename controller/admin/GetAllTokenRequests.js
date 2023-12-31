const UsersCollection = require("../../models/user.model");

const GetAllTokenRequests = async (req, res) => {
  try {
    //get all users with isTokenRequested Flag to true from db
    const usersWithTokenRequest = await UsersCollection.find(
      {
        isTokensRequested: true,
      }
    );

    res.send({
      type: "success",
      msg: "All users with tokenRequests are fetched",
      usersWithTokenRequest,
    });
  } catch (err) {
    return res.status(500).send({ type: "error", msg: err.message });
  }
};

module.exports = GetAllTokenRequests;
