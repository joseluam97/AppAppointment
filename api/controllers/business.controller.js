const Businesss = require("../models/Business");
const Schedule = require("../models/Schedule");
const User = require("../models/User");

const { ObjectId } = require("mongodb");

const businessCtrl = {};
businessCtrl.postBusiness = async (req, res) => {
  console.log("postBusiness - INI");
  console.log(req.body);
  // Create scheudables
  const schedulePromises = req.body.scheudable.map(async (scheduleData) => {
    const new_scheudable = new Schedule();
    new_scheudable.day_week = scheduleData.day_week;
    new_scheudable.time_open = scheduleData.time_open;
    new_scheudable.time_close = scheduleData.time_close;
    return await new_scheudable.save();
  });

  try {
    // Wait for all Schedule creation pledges to be completed.
    const schedules = await Promise.all(schedulePromises);

    // Collect the IDs of the created Schedule documents
    const scheduleIds = schedules.map((schedule) => schedule._id);

    // Create the new Business with the Schedule document IDs
    const business = new Businesss({
      name: req.body.name,
      address: req.body.address,
      zip_code: req.body.zip_code,
      scheudable: scheduleIds,
      country: req.body.country,
      province: req.body.province,
      city: req.body.city,
      phone: req.body.phone,
    });

    const newBusiness = await business.save();

    // Update user with your business
    const user_selected = await User.findOne({ _id: req.body.user });
    user_selected.my_business = newBusiness._id;
    //await user_selected.save();

    res.json(newBusiness);
  } catch (err) {
    console.log(err);
    res.json({ message: err.message });
  }
};

businessCtrl.putBusiness = async (req, res) => {
  console.log("putBusiness - INI");
  try {
    const post = await Businesss.findOne({ _id: req.params.id });

    if (req.body.name) {
      post.name = req.body.name;
    }
    if (req.body.address) {
      post.address = req.body.address;
    }
    if (req.body.phone) {
      post.phone = req.body.phone;
    }
    if (req.body.zip_code) {
      post.zip_code = req.body.zip_code;
    }
    if (req.body.scheudable) {
      post.scheudable = req.body.scheudable;
    }
    if (req.body.country) {
      post.country = req.body.country;
    }
    if (req.body.province) {
      post.province = req.body.province;
    }
    if (req.body.city) {
      post.city = req.body.city;
    }

    await post.save();
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
};

businessCtrl.getBusinessById = async (req, res) => {
  console.log("getBusinessById - INI");
  try {
    const idBusiness = req.params.id;

    // Obtener información básica del business
    const business = await Businesss.findById(idBusiness);

    if (!business) {
      return res.status(404).json({ error: "Business no encontrado" });
    }

    res.json(business);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

businessCtrl.getAllBusiness = async (req, res) => {
  console.log("getAllBusiness - INI");
  try {
    let businesssConPrecios = await Businesss.find({}).populate('scheudable');

    res.status(200).send(businesssConPrecios);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
};

businessCtrl.deleteBusinessById = async (req, res) => {
  console.log("deleteBusinessById - INI");
  const { id } = req.params;
  Businesss.findByIdAndRemove(id, (error, business) => {
    if (!error) {
      console.log(business);
    }
  });
};

module.exports = businessCtrl;
