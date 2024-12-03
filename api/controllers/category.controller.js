const Categorys = require("../models/Category");

const { ObjectId } = require("mongodb");

const categoryCtrl = {};
categoryCtrl.postCategory = async (req, res) => {
  console.log("postCategory - INI");
  console.log(req.body);
  const category = new Categorys({
    business: req.body.business,
    name: req.body.name,
    description: req.body.description,
  });
  try {
    const newCategory = await category.save();
    res.json(newCategory);
  } catch (err) {
    console.log(err);
    res.json({ message: err.message });
  }
};

categoryCtrl.putCategory = async (req, res) => {
  console.log("putCategory - INI");
  try {
    const post = await Categorys.findOne({ _id: req.params.id });

    if (req.body.business) {
      post.business = req.body.business;
    }
    if (req.body.name) {
      post.name = req.body.name;
    }
    if (req.body.description) {
      post.description = req.body.description;
    }
    await post.save();
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
};

categoryCtrl.getCategoryById = async (req, res) => {
  console.log("getCategoryById - INI");
  try {
    const idCategory = req.params.id;

    // Obtener información básica del category
    const category = await Categorys.findById(idCategory);

    if (!category) {
      return res.status(404).json({ error: "Category no encontrado" });
    }

    res.json(category);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

categoryCtrl.getAllCategory = async (req, res) => {
  console.log("getAllCategory - INI");
  try {
    let categorysConPrecios = await Categorys.find({});

    res.status(200).send(categorysConPrecios);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
};

categoryCtrl.getCategoryByBusiness = async (req, res) => {
  console.log("getCategoryByBusiness - INI");
  try {
    const idBusiness = req.params.id;

    const categorysConPrecios = await Categorys.aggregate([
      {
        $match: { business: ObjectId(idBusiness) }
      },
      {
        $lookup: {
          from: 'subcategories', // Nombre de la colección de subcategorías
          localField: '_id',
          foreignField: 'category',
          as: 'subcategories'
        }
      }
    ]);

    res.status(200).send(categorysConPrecios);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
};

categoryCtrl.deleteCategoryById = async (req, res) => {
  console.log("deleteCategoryById - INI");
  const { id } = req.params;
  Categorys.findByIdAndRemove(id, (error, category) => {
    if (!error) {
      console.log(category)
    }
  });
};

module.exports = categoryCtrl;