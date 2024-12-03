const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    business:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Business",
    },
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: false,
    }

});
module.exports = mongoose.model('Category', itemSchema);