const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32,
    text: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000,
    text: true,
  },
  images: {
    type: Array,
  },
  variants: [
    {
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  seo_title: {
    type: String,
    trim: true,
    required: true,
    maxlength: 60,
  },
  seo_description: {
    type: String,
    trim: true,
    required: true,
    maxlength: 260,
  },
});

productSchema.statics.build = (attrs) => new Product(attrs);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
