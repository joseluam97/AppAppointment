const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    day_week:{
        type: Number,
        required: true,
    },
    time_open:{
        type: Date,
        required: true,
    },
    time_close:{
        type: Date,
        required: true,
    }
});
module.exports = mongoose.model('Schedule', itemSchema);