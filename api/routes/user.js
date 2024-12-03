const express = require('express');
const router = express.Router();

//Modelos
const user = require("../controllers/user.controller");

router.get('/byBusiness/:id', user.getUserByBusiness);
router.post('/login', user.loginUser);
router.get('/', user.getAllUser);
router.post('/', user.postUser);
router.put("/:id", user.putUser);
router.get('/:id', user.getUserById);
router.delete('/:id', user.deleteUserById);

module.exports = router;