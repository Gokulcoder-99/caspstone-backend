const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email",
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(v);
        },
        message: "Please enter a strong password-eg: Password@1",
      },
    },
    employeeId: {
      type: String,
      required: [true,"employeeId is not available"],
      unique: true,
    },
    userRole: {
      type: String,
      default: "EMPLOYEE",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    TokensMax: {
      type: Number,
      default: 0,
    },
    mealTokensGenerated: {
      type: Number,
      default: 0,
    },
    beverageTokensGenerated: {
      type: Number,
      default: 0,
    },
    snackTokensGenerated: {
      type: Number,
      default: 0,
    },
    isTokensRequested: {
      type: Boolean,
      default: false,
    },
    tokenRequested: {
      type: Number,
      default: undefined,
    }
});

module.exports=mongoose.model("UsersCollection",userSchema)