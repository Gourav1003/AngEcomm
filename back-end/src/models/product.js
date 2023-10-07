const validator = require("validator");
const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const { urlencoded } = require("express");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,

      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    image_url: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;