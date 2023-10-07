const express = require("express");

const Product = require("../models/product");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await Product.find()
    res.send(data);
  }

  catch (e) {
    console.log(e)
  }
})

router.get("/:productTitle", async(req, res) => {
  const productTitle = req.params.productTitle;
  console.log('hello')
  const product = await Product.findOne({title:productTitle})
  res.send(product)
})



module.exports = router