const Appointments = require("../models/Appointment");

const { ObjectId } = require("mongodb");
const SubCategory = require("../models/SubCategory");
const Appointment = require("../models/Appointment");
const Schedule = require("../models/Schedule");
const Business = require("../models/Business");
const Users = require("../models/User");

const appointmentCtrl = {};
appointmentCtrl.postAppointment = async (req, res) => {
  console.log("postAppointment - INI");
  console.log(req.body);
  const appointment = new Appointments({
    business: req.body.business,
    user: req.body.user,
    type: req.body.type,
    date_appointment: req.body.date_appointment,
    description: req.body.description,
    complete: req.body.complete,
    approved: req.body.approved,
  });
  try {
    const newAppointment = await appointment.save();
    res.json(newAppointment);
  } catch (err) {
    console.log(err);
    res.json({ message: err.message });
  }
};

appointmentCtrl.getTimeAvailableAppointment = async (req, res) => {
  console.log("getTimeAvailableAppointment - INI");
  const date_appointment = new Date(req.body.date_appointment);
  const type_appointment = req.body.type_appointment;

  const appointment_selected = await SubCategory.findOne({ _id: type_appointment });

  let time_appointment_selected = appointment_selected.time;
  let day_selected = new Date(date_appointment).getDay();

  const scheudable_day = await Schedule.find({ day_week: day_selected });

  let list_times_availables_appointment = [];
  let cont_num_citas = 1;
  
  let cont_iter = 0;

  for (let item_scheudable in scheudable_day) {
    let time_to_close = false;

    let date_today_open = setDateToHours(new Date(scheudable_day[item_scheudable].time_open), date_appointment);
    let date_today_close = setDateToHours(new Date(scheudable_day[item_scheudable].time_close), date_appointment);

    let date_init_appointment = new Date(date_today_open);
    let date_end_appointment = new Date(date_init_appointment);
    date_end_appointment.setMinutes(date_init_appointment.getMinutes() + time_appointment_selected);

    while (time_to_close == false) {
      // Check if exist a appointment in this range of hours
      let appointments_in_range = await Appointment.find({ date_appointment: { $gte: date_init_appointment, $lte: date_end_appointment } });

      if (appointments_in_range.length == 0) {
        // There are no appointments in this time frame
        list_times_availables_appointment.push({
          _id: cont_num_citas.toString(),
          time_available: new Date(date_init_appointment),
        });
        cont_num_citas = cont_num_citas + 1;
      }

      // Add time to check in next iteration
      date_init_appointment = new Date(date_end_appointment);
      date_end_appointment = new Date(date_init_appointment);
      date_end_appointment.setMinutes(date_init_appointment.getMinutes() + time_appointment_selected);

      // Check if local is closed
      if (checkIfDateInRange(new Date(date_init_appointment), new Date(date_end_appointment), new Date(date_today_close))) {
        time_to_close = true;
      }

      //time_to_close = true;
      cont_iter = cont_iter + 1;

      if(cont_iter == 2){
        //time_to_close = true;
      }
    }
  }
  
  console.log(list_times_availables_appointment)
  console.log("END - getTimeAvailableAppointment")
  res.json(list_times_availables_appointment);
};

function setDateToHours(hour, date_selected) {
  let date_formet = new Date();
  date_formet.setDate(date_selected.getDate());
  date_formet.setMonth(date_selected.getMonth() + 1);
  date_formet.setFullYear(date_selected.getFullYear());

  date_formet.setSeconds(hour.getSeconds());
  date_formet.setMinutes(hour.getMinutes());
  date_formet.setHours(hour.getHours());

  return date_formet;
}

function checkIfDateInRange(date_init, date_end, date_close) {
  // Convertir las fechas a milisegundos
  const initTime = date_init.getTime();
  const endTime = date_end.getTime();
  const closeTime = date_close.getTime();

  // Verificar si la fecha_check está dentro del rango
  if(closeTime < endTime){
    // It´s close
    return true;
  }
  else if(closeTime > initTime && closeTime >= endTime){
    return false;
  }
  
  return true;
  
}

appointmentCtrl.putAppointment = async (req, res) => {
  console.log("putAppointment - INI");
  try {
    const post = await Appointments.findOne({ _id: req.params.id });

    if (req.body.business) {
      post.business = req.body.business;
    }
    if (req.body.user) {
      post.user = req.body.user;
    }
    if (req.body.type) {
      post.type = req.body.type;
    }
    if (req.body.date_appointment) {
      post.date_appointment = req.body.date_appointment;
    }
    if (req.body.description) {
      post.description = req.body.description;
    }
    post.complete = req.body.complete;
    post.approved = req.body.approved;
    
    await post.save();

    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
};

appointmentCtrl.getAppointmentById = async (req, res) => {
  console.log("getAppointmentById - INI");
  try {
    const idAppointment = req.params.id;

    // Obtener información básica del appointment
    const appointment = await Appointments.findById(idAppointment);

    if (!appointment) {
      return res.status(404).json({ error: "Appointment no encontrado" });
    }

    res.json(appointment);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

appointmentCtrl.getAllAppointment = async (req, res) => {
  console.log("getAllAppointment - INI");
  try {
    let appointmentsConPrecios = await Appointments.find({})
    .populate('business').populate('type').populate('user').sort({ date_appointment: -1 });

    res.status(200).send(appointmentsConPrecios);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
};

appointmentCtrl.getAppointmentsWithFilters = async (req, res) => {
  console.log("getAppointmentsWithFilters - INI");
  try {
    console.log(req.body.date_appointment)
    const id_business_input = req.body.business_appointment;
    const date_appointment_input = new Date(req.body.date_appointment);
    
    const bussines_input = await Business.findById(id_business_input);

    // Establecer la fecha de inicio del día
    const startOfDay = new Date(date_appointment_input);
    startOfDay.setHours(0, 0, 0, 0);

    // Establecer la fecha de fin del día
    const endOfDay = new Date(date_appointment_input);
    endOfDay.setHours(23, 59, 59, 999);

    let appointmentsConPrecios = await Appointments.find({
      $and: [
          { date_appointment: { $gte: startOfDay, $lt: endOfDay } },
          { business: bussines_input }
      ]
    })
    .populate('business')
    .populate('type')
    .populate('user')
    .sort({ date_appointment: 1 });

    res.status(200).send(appointmentsConPrecios);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
};

appointmentCtrl.getAppointmentsByUser = async (req, res) => {
  console.log("getAppointmentsByUser - INI");
  try {
    const user_appointment = req.body.user_appointment;
    const business_appointment = req.body.business_appointment;
    
    const user_object = await Users.findById(user_appointment);
    const bussines_object = await Business.findById(business_appointment);
    
    let appointmentsByUser = await Appointments.find({
      $and: [
          { user: user_object },
          { business: bussines_object }
      ]
    })
    .populate('business')
    .populate('type')
    .populate('user')
    .sort({ date_appointment: 1 });

    res.status(200).send(appointmentsByUser);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
};

appointmentCtrl.getNextAppointmentsByUser = async (req, res) => {
  console.log("getNextAppointmentsByUser - INI");
  try {
    const user_appointment = req.body.user_appointment;
    const business_appointment = req.body.business_appointment;
    
    const user_object = await Users.findById(user_appointment);
    const bussines_object = await Business.findById(business_appointment);
    // Establecer la fecha de inicio del día
    const startOfDay = new Date();
    
    console.log("-startOfDay-")
    console.log(startOfDay)

    let appointmentsByUser = await Appointments.find({
      $and: [
          { date_appointment: { $gte: startOfDay } },
          { user: user_object },
          { business: bussines_object }
      ]
    })
    .populate('business')
    .populate('type')
    .populate('user')
    .sort({ date_appointment: 1 });

    console.log("-appointmentsByUser-")
    console.log(appointmentsByUser)

    res.status(200).send(appointmentsByUser);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
};

appointmentCtrl.deleteAppointmentById = async (req, res) => {
  console.log("deleteAppointmentById - INI");
  const { id } = req.params;
  Appointments.findByIdAndRemove(id, (error, appointment) => {
    if (!error) {
      console.log(appointment);
    }
  });
};

module.exports = appointmentCtrl;
