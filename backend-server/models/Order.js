const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
     TableId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Table',
        required:true
     },
     Items:[{
        menuItem:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Menu'
        },
        quantity:{
            type:Number,
            required:true
        }
     }],
     status:{
        type:String,
        enum:['pending','completed'],
        default:'pending'
     },
});

module.exports   = mongoose.model('Order',OrderSchema)