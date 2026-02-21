const express = require('express');
const router = express.Router();
const Order =  require('../models/Order');

router.post('/place', async(req , res) =>{
    try{
        const {TableId, Items,status} = req.body;
        const newOrder= new Order({TableId, Items,status});
         await newOrder.save();
         res.status(201).json(newOrder);
    }
    catch(err)
    {
        res.status(500).json({error:'Failed to Place Order',details: err.message});
    }
}); 

router.get('/', async (req , res) =>{
    try{
        const orders = await Order.find().populate('TableId Items.menuItem');
        res.json(orders);
    }
    catch(err){
       res.status(500).json('Failed to fetch Order',err);
    }
});

module.exports = router;
