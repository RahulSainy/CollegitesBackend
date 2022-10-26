import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    enroll: {
      type: String,
      required: true,
      unique: true,
    },
    branch: {
      type: String,
      required: true,
    },
    sem: {
      //make it to number if performing calculations
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    // address: {
    //   type: String,
    //   required: true,
    // },
    // contact: {
    //   phone_no: {
    //     type: String,
    //     required: true,
    //   },
    //   isVerified: {
    //     type: Boolean,
    //     required: true,
    //     default: false,
    //   },
    // },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//this is for encrypting the password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);
export default User;

// Better Aproach Above

// import mongoose from 'mongoose'
// // npm install --save mongoose-unique-validator
// const uniqueValidator = require("mongoose-unique-validator");

// const userSchema = mongoose.Schema({
//     email: {
//         type: String, required: true, unique: true
//     },
//     password: {
//         type: String, required: true
//     }
// });
// //because unique is  a plugin so added it explicitly
// userSchema.plugin(uniqueValidator)

// module.exports = mongoose.model("User", userSchema)
