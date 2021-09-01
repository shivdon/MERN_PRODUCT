const express = require("express");

const router = express.Router();
const {
  createProduct,
  listAllProducts,
  getSingleProduct,
} = require("../controllers/product");

router.post("/merchant/product", createProduct);
router.get("/users/products", listAllProducts);
router.get("/users/product/:id", getSingleProduct);

module.exports = router;
