const mongoose = require('mongoose');
//npm install --save mongoose-unique-validator

const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
    email:{
        type: String, require:true,
        unique: true
    },
    password:{
        type: String, require:true
    }
});

//because unique is a plugin so added explicitly
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);