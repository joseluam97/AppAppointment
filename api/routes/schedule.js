const express = require('express');
const router = express.Router();

//Modelos
const schedule = require("../controllers/schedule.controller");

router.get('/', schedule.getAllSchedule);
router.post('/', schedule.postSchedule);
router.put("/:id", schedule.putSchedule);
router.get('/:id', schedule.getScheduleById);
router.delete('/:id', schedule.deleteScheduleById);

module.exports = router;