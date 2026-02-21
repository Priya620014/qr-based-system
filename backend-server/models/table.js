const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
    TableNo:
    {
        type:Number,
        required:true
        // unique:true
    }
});
module.exports = mongoose.model('Table', tableSchema);