const express = require("express");

const Cart = require("../models/cart");
const Product = require("../models/product");
const auth = require("./auth/user");
const router = express.Router();

 router.use(auth);

// Receive a post request to add an item to a cart
router.post("/products", async (req, res) => {
  // Figure out the cart!
console.log(req.body)
let cart;

console.log(req.body.title);
const product = await Product.findOne({title:req.body.title})
console.log(product)
console.log(req.id)
  cart = await Cart.findOne({ userId: req.id });
  if (!cart) {
    let cartstatus = {
      items: {
        product: product._id,
        quantity: 1,
      },
      userId: req.id,
    };
    console.log(cartstatus);
    cart = new Cart(cartstatus);
    await cart.save();
    res.status(200).send({ msg: "Item added to cart" });
  } else {
    console.log(cart);

    const existingItem = cart.items.find(
      (item) =>item.product.equals(product._id)
     
      

    );
    if (existingItem) {
      existingItem.quantity++;
    } else {
      // add new product id to items array
      cart.items.push({ product: product._id, quantity: 1 });
    }
    await Cart.updateOne({ userId: req.id }, { $set: cart });
    res.status(200).send({ msg: "Item added to cart" });
  }

//   // const existingItem = cart.items.find(item => item.id === req.body.productId);
//   // if (existingItem) {
//   //   // increment quantity and save cart
//   //   existingItem.quantity++;
//   // } else {
//   //   // add new product id to items array
//   //   cart.items.push({ id: req.body.productId, quantity: 1 });
//   // }
//   // await cartsRepo.update(cart.id, {
//   //   items: cart.items
//   // });

//   // res.redirect('/cart');
});

// Receive a GET request to show all items in cart
router.get("/", async (req, res) => {
  try {
    const userId = req.id; // Assuming req.id contains the user's ID

    // Find the cart by userId and populate the "items.id" field with product details
    const cart = await Cart.findOne({ userId }).populate({
      path: "items.product",
      select: "title price image_url", // Specify which fields you want from the product
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Receive a post request to delete an item from a cart

router.post("/products/delete", async (req, res) => {
  const { itemId } = req.body;

  const cart = await Cart.findOne({ userId: req.id });

  const items = cart.items.filter((item) => item.product != itemId);

  await Cart.updateOne({ userId: req.id }, { $set: { items: items } });
  res.status(200).send({ msg: "Deleted Successfully." });
});
module.exports = router;