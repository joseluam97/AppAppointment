const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required: true,
    },
    last_name:{
        type: String,
        required: true,
    },
    date_birth:{
        type: Date,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    my_business:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Business",
    },
    list_business:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Business",
    }]
});


module.exports = mongoose.model('User', itemSchema);