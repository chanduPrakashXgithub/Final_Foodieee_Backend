const multer=require('multer')

const vendors = require('../models/Vendor');

const products = require('../models/Product');
const Firm=require('../models/Firm');
const path=require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const addFirm = async (req, res) => {
    try {
        const { firmname, area, category, region, offer } = req.body; // corrected 'firstname' to 'firmname'
        const image = req.file ? req.file.filename : undefined;

        const vendor = await vendors.findById(req.vendorsId); 
        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }
        if(vendor.firm.length > 0){
            return res.status(400).json({message :"vendor can have only one firm"})
        }

        const firm = new Firm({
            firmname, 
            area,
            category,
            region,
            offer,
            image,
            vendors: [vendor._id]
        });

        const savedFirm = await firm.save();
        const firmId=savedFirm._id;
        vendor.firm.push(savedFirm);  
        await vendor.save();
       
        


        res.status(200).json({ message: "Firm added successfully" ,firmId});
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Firm did not add successfully" });
    }
};

const deleteFirmById = async (req, res) => {
    try {
        const firmId = req.params.firmId;
        const deletedFirm = await Firm.findByIdAndDelete(firmId);
        if (!deletedFirm) {
            return res.status(400).json({ message: 'Firm not found' });
        }
        res.status(200).json({ message: 'Firm deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: 'Internal server error' });
    }
};

module.exports = { addFirm: [upload.single('image'), addFirm],deleteFirmById};