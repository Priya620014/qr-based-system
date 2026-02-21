const express = require('express');
const router = express.Router();
const Table = require('../models/table');

router.post('/create', async (req , res) =>{
    try{
        const {TableNo} = req.body;
        const newTable = new Table({TableNo});
        await newTable.save();
        res.status(201).json(newTable);
    }
    catch(error){
        console.log(error);
         res.status(500).json({error:'Failed to create table'});
    }
});

router.get('/',async (req,res) =>
{
    try{
        const tables = await Table.find();
        res.json(tables);
    }
    catch(error)
    {
      
        res.status(500).json({error:'Failed to get tables'});
    }
})


module.exports = router;