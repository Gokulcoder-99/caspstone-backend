const mongoose = require("mongoose");

const tokenSchema = mongoose.Schema(
  {
    employeeId: {
      type:Number,
      required: true,
    },
    tokenString: {
      type: String,
      required: true,
    },
    tokenRedeemed: {
      type: Boolean,
      default: false,
    },
    tokenType: {
      type: String,
      required: true,
      enum: ["meal", "beverage","snack"],
    },
    createdDate: {
      type: String,
      default: new Date(Date.now()).toISOString().split("T")[0],
    },
  },
  { timestamps: true }
);

const TokensCollection = mongoose.model(
  "TokenCollection",
  tokenSchema,
  "Tokens"
);

module.exports = TokensCollection;
