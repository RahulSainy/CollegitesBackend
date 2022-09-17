const mongoose = require("mongoose");

const notesSchema = mongoose.Schema({
    sFname:{ type:String, require:true},

})

module.exports = mongoose.model('Post',notesSchema)