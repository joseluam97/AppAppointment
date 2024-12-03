const express = require('express');
const router = express.Router();

//Modelos
const appointment = require("../controllers/appointment.controller");

router.post('/filters', appointment.getAppointmentsWithFilters);
router.post('/byUser', appointment.getAppointmentsByUser);
router.post('/nextByUser', appointment.getNextAppointmentsByUser);
router.get('/', appointment.getAllAppointment);
router.post('/timeAvailable', appointment.getTimeAvailableAppointment);
router.post('/', appointment.postAppointment);
router.put("/:id", appointment.putAppointment);
router.get('/:id', appointment.getAppointmentById);
router.delete('/:id', appointment.deleteAppointmentById);

module.exports = router;