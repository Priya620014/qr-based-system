const express= require('express');
const router = express.Router();
const generateQRCode = require('../controllers/QrCode');
const Table = require('../models/table');


router.get('/:id', async(req , res) =>{
    console.log("QR Route hit ✅", req.params.id);
    try{
        
        const table = await Table.findById(req.params.id);
        if(!table) return res.status(400).json({error:'Table not found'});
        const qrImage = await generateQRCode(table._id);
        // res.send(`<img src= "${qrImage}"/>`);
        res.send(`
  <html>
    <body style="text-align:center; padding-top: 30px;">
      <h2>QR Code for Table</h2>
      <img src="${qrImage}" alt="QR Code" />
    </body>
  </html>
`);

        
    }
    catch(err)
    {
        res.status(500).json({error:'Qr Code Generation Error', details:err.message});
    }
});
module.exports = router;