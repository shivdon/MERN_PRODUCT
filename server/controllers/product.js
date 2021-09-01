const Product = require("../models/product");

exports.createProduct = async (req, res) => {
  const { title } = req.body;

  try {
    const existingProduct = await Product.findOne({ title }).exec();

    if (existingProduct) {
      res.send({ message: "product exists" });
      return;
    }

    const product = await Product.build(req.body).save();
    return res.status(200).send(product);
  } catch (err) {
    return res.send({ message: err.message });
  }
};

exports.listAllProducts = async (req, res) => {
  const products = await Product.find({}).exec();
  res.send(products);
};

exports.getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).exec();
    res.send(product);
  } catch (err) {
    console.log(err);
  }
};
