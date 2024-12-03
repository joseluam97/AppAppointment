const express = require('express');
const router = express.Router();

//Modelos
const category = require("../controllers/category.controller");

router.get('/business/:id', category.getCategoryByBusiness);
router.get('/', category.getAllCategory);
router.post('/', category.postCategory);
router.put("/:id", category.putCategory);
router.get('/:id', category.getCategoryById);
router.delete('/:id', category.deleteCategoryById);

module.exports = router;