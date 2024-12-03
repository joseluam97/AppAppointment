const SubCategorys = require("../models/SubCategory");

const { ObjectId } = require("mongodb");

const subCategoryCtrl = {};
subCategoryCtrl.postSubCategory = async (req, res) => {
  console.log("postSubCategory - INI");
  console.log(req.body);
  const subCategory = new SubCategorys({
    title: req.body.title,
    price: req.body.price,
    time: req.body.time,
    category: req.body.category,
  });
  try {
    const newSubCategory = await subCategory.save();
    res.json(newSubCategory);
  } catch (err) {
    console.log(err);
    res.json({ message: err.message });
  }
};

subCategoryCtrl.putSubCategory = async (req, res) => {
  console.log("putSubCategory - INI");
  try {
    const post = await SubCategorys.findOne({ _id: req.params.id });

    if (req.body.title) {
      post.title = req.body.title;
    }
    if (req.body.price) {
      post.price = req.body.price;
    }
    if (req.body.time) {
      post.time = req.body.time;
    }
    if (req.body.category) {
      post.category = req.body.category;
    }

    await post.save();
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
};

subCategoryCtrl.getSubCategoryByCategory = async (req, res) => {
  console.log("getSubCategoryByCategory - INI");
  try {
    const idSubCategory = req.params.id;

    // Obtener información básica del subCategory
    const subCategory = await SubCategorys.find({category: idSubCategory});

    if (!subCategory) {
      return res.status(404).json({ error: "SubCategory no encontrado" });
    }

    res.json(subCategory);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

subCategoryCtrl.getSubCategoryById = async (req, res) => {
  console.log("getSubCategoryById - INI");
  try {
    const idSubCategory = req.params.id;

    // Obtener información básica del subCategory
    const subCategory = await SubCategorys.findById(idSubCategory);

    if (!subCategory) {
      return res.status(404).json({ error: "SubCategory no encontrado" });
    }

    res.json(subCategory);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

subCategoryCtrl.getAllSubCategory = async (req, res) => {
  console.log("getAllSubCategory - INI");
  try {
    let subCategorysConPrecios = await SubCategorys.find({});

    res.status(200).send(subCategorysConPrecios);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
};

subCategoryCtrl.deleteSubCategoryById = async (req, res) => {
  console.log("deleteSubCategoryById - INI");
  const { id } = req.params;
  SubCategorys.findByIdAndRemove(id, (error, subCategory) => {
    if (!error) {
      console.log(subCategory)
    }
  });
};

module.exports = subCategoryCtrl;