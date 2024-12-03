const Schedules = require("../models/Schedule");

const { ObjectId } = require("mongodb");

const scheduleCtrl = {};
scheduleCtrl.postSchedule = async (req, res) => {
  console.log("postSchedule - INI");
  console.log(req.body);
  const schedule = new Schedules({
    day_week: req.body.day_week,
    time_open: req.body.time_open,
    time_close: req.body.time_close,
  });
  try {
    const newSchedule = await schedule.save();
    res.json(newSchedule);
  } catch (err) {
    console.log(err);
    res.json({ message: err.message });
  }
};

scheduleCtrl.putSchedule = async (req, res) => {
  console.log("putSchedule - INI");
  try {
    const post = await Schedules.findOne({ _id: req.params.id });

    if (req.body.day_week) {
      post.day_week = req.body.day_week;
    }
    if (req.body.time_open) {
      post.time_open = req.body.time_open;
    }
    if (req.body.time_close) {
      post.time_close = req.body.time_close;
    }

    await post.save();
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
};

scheduleCtrl.getScheduleById = async (req, res) => {
  console.log("getScheduleById - INI");
  try {
    const idSchedule = req.params.id;

    // Obtener información básica del schedule
    const schedule = await Schedules.findById(idSchedule);

    if (!schedule) {
      return res.status(404).json({ error: "Schedule no encontrado" });
    }

    res.json(schedule);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

scheduleCtrl.getAllSchedule = async (req, res) => {
  console.log("getAllSchedule - INI");
  try {
    let schedulesConPrecios = await Schedules.find({});

    res.status(200).send(schedulesConPrecios);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
};

scheduleCtrl.deleteScheduleById = async (req, res) => {
  console.log("deleteScheduleById - INI");
  const { id } = req.params;
  Schedules.findByIdAndRemove(id, (error, schedule) => {
    if (!error) {
      console.log(schedule)
    }
  });
};

module.exports = scheduleCtrl;