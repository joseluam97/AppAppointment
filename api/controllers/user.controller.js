const Users = require("../models/User");

const { ObjectId } = require("mongodb");

const userCtrl = {};
userCtrl.postUser = async (req, res) => {
  console.log("postUser - INI");
  console.log(req.body);
  const user = new Users({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    date_birth: req.body.date_birth,
    email: req.body.email,
    password: req.body.password,
    address: req.body.address,
    my_business: req.body.my_business,
    list_business: req.body.list_business,
  });
  try {
    const newUser = await user.save();
    res.json(newUser);
  } catch (err) {
    console.log(err);
    res.json({ message: err.message });
  }
};

userCtrl.putUser = async (req, res) => {
  console.log("putUser - INI");
  console.log(req.body);
  console.log(req.params);
  try {
    const post = await Users.findOne({ _id: req.params.id });

    if (req.body.first_name) {
      post.first_name = req.body.first_name;
    }
    if (req.body.last_name) {
      post.last_name = req.body.last_name;
    }
    if (req.body.date_birth) {
      post.date_birth = req.body.date_birth;
    }
    if (req.body.email) {
      post.email = req.body.email;
    }
    if (req.body.password) {
      post.password = req.body.password;
    }
    if (req.body.address) {
      post.address = req.body.address;
    }
    if (req.body.my_business) {
      post.my_business = req.body.my_business;
    }
    if (req.body.list_business) {
      post.list_business = req.body.list_business;
    }
    
    await post.save();

    // Populate fields
    const populatedPost = await post.populate('my_business').populate('list_business').execPopulate();

    console.log("putUser - END");
    res.send(populatedPost);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
};

userCtrl.getUserById = async (req, res) => {
  console.log("getUserById - INI");
  try {
    const idUser = req.params.id;

    // Obtener información básica del user
    const user = await Users.findById(idUser).populate('my_business').populate('list_business');

    if (!user) {
      return res.status(404).json({ error: "User no encontrado" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

userCtrl.getAllUser = async (req, res) => {
  console.log("getAllUser - INI");
  try {
    let usersConPrecios = await Users.find({}).populate('my_business').populate('list_business');

    res.status(200).send(usersConPrecios);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
};

userCtrl.deleteUserById = async (req, res) => {
  console.log("deleteUserById - INI");
  const { id } = req.params;
  Users.findByIdAndRemove(id, (error, user) => {
    if (!error) {
      console.log(user);
    }
  });
};

userCtrl.loginUser = async (req, res) => {
  try {
    console.log("loginUser - INI");
    let email = req.body.email;
    let password = req.body.password;
    const userLogin = await Users.findOne({ email: email }).populate('my_business').populate('list_business');

    if (!userLogin) {
      console.error("The email address is not registered in the system.");
      return res.status(400).send({ error: "The email address is not registered in the system." });
    }

    if (password !== userLogin.password) {
      console.error("The password is incorrect");
      return res.status(401).send({ error: "The password is incorrect" });
    }

    // Si llega hasta aquí, el usuario y la contraseña son correctos
    res.send(userLogin);
    
  } catch (err) {
    console.error("Error in loginUser:", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

userCtrl.getUserByBusiness = async (req, res) => {
  try {
    console.log("getUserByBusiness - INI");
    const businessId = req.params.id;

    // Realiza la consulta en la base de datos
    const users = await Users.find({ list_business: { $in: [ObjectId(businessId)] } });

    console.log('Users found:', users);

    // Enviar respuesta
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener usuarios');
  }
  
};

module.exports = userCtrl;
