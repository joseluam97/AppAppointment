const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    business:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Business",
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    type:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
    },
    date_appointment:{
        type: Date,
        required: true,
    },
    description:{
        type: String,
        required: false,
    },
    complete:{
        type: Boolean,
        required: true,
    },
    approved:{
        type: Boolean,
        required: true,
    }
});
module.exports = mongoose.model('Appointment', itemSchema);