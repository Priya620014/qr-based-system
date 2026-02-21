const mongoose = require('mongoose');
const MenuSchema = new mongoose.Schema({
    ItemName:{
        type:String,
        required:true
    },
    Price:{
        type:Number,
        required:true
    },
    Available:{
        type:Boolean,
        default:true
    },
   image:{
    type:String
   }

});
module.exports = mongoose.model('Menu',MenuSchema)