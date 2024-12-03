const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    zip_code:{
        type: Number,
        required: true,
    },
    country:{
        type: String,
        required: true,
    },
    province:{
        type: String,
        required: true,
    },
    city:{
        type: String,
        required: true,
    },
    scheudable:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Schedule",
    }]
});
module.exports = mongoose.model('Business', itemSchema);