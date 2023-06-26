const TokensCollection = require("../../models/Tokens");
const UsersCollection = require("../../models/user.model");
const { v4: uuid } = require("uuid");


const GenerateTokenController = async (req, res) => {
  const { employeeId,tokenType} = req.body;

  try {

    const tokenString = `${tokenType.slice(0,2).toUpperCase()}-${uuid()}`;
    console.log(tokenString)
    //verify user exists
    const userFound = await UsersCollection.findOne({employeeId});
    if (!userFound) {
      return res
        .status(404)
        .json({ 
          status:'fail',
          message: "no such user available" });
    }

    //cant generate more than the limit -checking it here
    //tokensCreatedToday ->find tokens generated with current Date in db
    const tokensCreatedToday = await TokensCollection.find({
      createdDate: new Date().toISOString().split("T")[0],
    });
    
    //if limit reached (3 meal,2 beverage,2snacks)tokens -total count 7
    if (tokensCreatedToday.length === 7) {
      return res.status(403).json({
        status: "fail",
        message: "Sorry Buddy,Tokens generated to the Maximum Limit Today, try again Tomorrow",
      });
    }
   
    //check for meal and beverage type tokens below
    //mealType token
    if (tokenType.slice(3) === "meal") {
      //finding if mealToken present in the tokensCreatedToday
      const mealTokenFoundToday = tokensCreatedToday.filter(
        (tokenObj) => tokenObj.tokenType.slice(3) === "meal"
      );
      
      //max-limit for mealToken is 1
      //if mealTokenFoundToday obj found -return you cant generate new meal token
      if (mealTokenFoundToday.length >2) {
        return res.status(403).json({
          status: "fail",
          message: "Sorry Buddy,Meal-Token generated to the Maximum Limit Today, try again Tomorrow",
        });
      }
      
    }
    
    //beverageType token
    if (tokenType.slice(3) === "beverage") {
      //filtering  beverage token type objects from tokensCreatedToday
      const beverageTokensFoundToday = tokensCreatedToday.filter(
        (tokenObj) => tokenObj.tokenType.slice(3) === "beverage"
      );
      //max-limit for beverageToken is 2
      //so, if beverageTokensFoundToday.length > 1 then say you cant generate token
      if (beverageTokensFoundToday.length > 1) {
        return res.status(403).json({
          status: "fail",
        message: "Sorry Buddy,Beverage-Token generated to the Maximum Limit Today, try again Tomorrow",
        });
      }
    }
    
    if (tokenType.slice(3) === "snack") {
      //filtering  snack token type objects from tokensCreatedToday
      const snackTokensFoundToday = tokensCreatedToday.filter(
        (tokenObj) => tokenObj.tokenType.slice(3) === "snack"
      );
      //max-limit for snackToken is 2
      //so, if snackTokensFoundToday.length > 1 then say you cant generate token
      if (snackTokensFoundToday.length > 1) {
        return res.status(403).json({
          status: "fail",
          message: "Sorry Buddy,snack-Token generated to the Maximum Limit Today, try again Tomorrow",
        });
      }
    }
   
    //create token here -finally
    const tokenCreated = await TokensCollection.create({
      employeeId,
      tokenType:tokenType.slice(3),
      tokenString,
    });
    console.log(tokenCreated)
  
    if (!tokenCreated) {
      return res
        .status(401)
        .json({ 
          status: "fail",
          message: "couldnot create Food-Token" });
    }

    //created token ,so add tokenGeneratedCount(meal or beverage) in usersCollection doc
    userFound[`${tokenType.slice(3)}TokensGenerated`] += 1;
    userFound.TokensMax -=1
    await userFound.save();
    
    res.json({
      status:  "success",
      message: `Token generated successfully, enjoy your ${tokenType.slice(3)}`,
      tokenString,
    });
  } catch (err) {
    return res.status(500).json({ 
      status: "fail",
      message: err.message });
  }
};

module.exports = GenerateTokenController;
