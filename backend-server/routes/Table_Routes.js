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

router.get('/', async (req, res) => {
    try {
        const tables = await Table.find();
        res.json(tables);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get tables' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const table = await Table.findById(req.params.id);
        if (!table) return res.status(404).json({ error: 'Table not found' });
        res.json(table);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get table' });
    }
});


module.exports = router;