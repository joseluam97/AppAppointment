const express = require('express');
const router = express.Router();

//Modelos
const subCategory = require("../controllers/subCategory.controller");

router.get('/', subCategory.getAllSubCategory);
router.get('/byCategory/:id', subCategory.getSubCategoryByCategory);
router.post('/', subCategory.postSubCategory);
router.put("/:id", subCategory.putSubCategory);
router.get('/:id', subCategory.getSubCategoryById);
router.delete('/:id', subCategory.deleteSubCategoryById);

module.exports = router;