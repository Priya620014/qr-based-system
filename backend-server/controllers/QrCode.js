const QRCode = require('qrcode');

const generateQRCode = async (TableId) =>{
    const url= `http://localhost:3000/table/${TableId}`;
    try{
        const QrImage = await QRCode.toDataURL(url);
        return QrImage;
    }
    catch(err){
    throw new Error('QR Genration Failed');
    }
};
module.exports = generateQRCode;