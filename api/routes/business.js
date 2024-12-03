const express = require('express');
const router = express.Router();

//Modelos
const business = require("../controllers/business.controller");

router.get('/', business.getAllBusiness);
router.post('/', business.postBusiness);
router.put("/:id", business.putBusiness);
router.get('/:id', business.getBusinessById);
router.delete('/:id', business.deleteBusinessById);

module.exports = router;