const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    time:{
        type: Number,
        required: true,
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
});
module.exports = mongoose.model('SubCategory', itemSchema, 'subcategories');