const express = require('express');
const router = express.Router();
const Menu = require('../models/menu')


router.post('/menu', async(req , res) =>{
    try{
        const {ItemName,Price,Available,image}= req.body;
        const newItem = new Menu({ItemName,Price,Available,image})
        await newItem.save();
        res.status(201).json(newItem)
    }
    catch(err){
        res.status(500).json('Failed to load Item',err)
    }
});

router.get('/', async (req, res) => {
  try {
    const item = await Menu.find();
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


//router
router.put('/:id', async(req,res) =>{
    try{
        const updateItem = await Menu.findByIdAndUpdate(req.params.id,req.body,{ new: true });
        res.json(updateItem);
    }
    catch(error)
    {
        res.status(500).json('Failed to update Item',error)
    }
});

//delete
router.delete('/:id', async(req,res) =>{
    try{
    await Menu.findByIdAndDelete(req.params.id);
    res.json({message:'Item deleted'});
    }
    catch(err)
    {
        res.status(500).json('Failed to delete Item', err);
    }
})
module.exports =router;