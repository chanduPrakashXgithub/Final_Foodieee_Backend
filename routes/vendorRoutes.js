const vendorController=require("../controllers/vendorController");
const express=require("express");
const router=express.Router();
router.post('/register',vendorController.vendorsRegister);
router.post('/login',vendorController.vendorsLogin);
router.get('/all-vendors',vendorController.getAllvendors);
router.get('/single-vendor/:id',vendorController.getvendorsById)
module.exports=router;