import express from "express";
import { cartModel } from "../model/cart.model.js";
import { TeaModel } from "../model/tea.model.js";
import isAuth from "../middlewares/isAuth.js";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";

const cartRouter = express.Router();

//Create
cartRouter.post("/", isAuth, attachCurrentUser, async (req, res) => {
  //const owner = req.user._id;
  const owner = req.currentUser;
  const { teaId, quantity } = req.body;

  try {
    const cart = await cartModel.findOne({ owner });
    const tea = await TeaModel.findOne({ _id: teaId });

    if (!tea) {
      return res.status(404).send({ message: "tea not found" });
    }

    const price = tea.price;
    const name = tea.name;

    if (cart) {
      const teaIndex = cart.teas.findIndex((tea) => tea.teaId == teaId);


      if (teaIndex > -1) {
        let product = cart.teas[teaIndex];
        product.quantity += quantity;
        cart.total = cart.teas.reduce((acc, curr) => {
          return acc + curr.quantity * curr.price;
        }, 0);
        cart.teas[teaIndex] = product;
        await cart.save();
        res.status(200).send(cart);
      } else {
        cart.teas.push({ teaId, name, quantity, price });
        cart.total = cart.teas.reduce((acc, curr) => {
          return acc + curr.quantity * curr.price;
        }, 0);
        await cart.save();
        res.status(200).send(cart);
      }
    } else {
      const newCart = await cartModel.create({
        owner,
        teas: [{ teaId, name, quantity, price }],
        total: quantity * price,
      });
      return res.status(201).send(newCart);
    }

  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//Read
cartRouter.get("/cart", isAuth, attachCurrentUser, async (req, res) => {
  const owner = req.currentUser;
  // const owner = req.user._id;

  try {
    const cart = await cartModel.findOne({ owner });
    if (cart && cart.teas.length > 0) {
      res.status(200).send(cart);
    } else {
      res.send(null);
    }
  } catch (err) {
    res.status(500).send();
  }
});

//Read Details
cartRouter.get("/:id", async (req, res) => {
  try {
    const cart = await cartModel.findOne({
      _id: req.params.id,
    });

    return res.status(200).json(cart);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//Edit
cartRouter.patch("/edit/:id", isAuth, attachCurrentUser, async (req, res) => {
  try {
    const editedCart = await cartModel.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true, runValidators: true }
    );

    return res.status(200).json(editedCart);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//Delete
cartRouter.delete("/delete", isAuth, attachCurrentUser, async (res, req) => {
  const owner = req.currentUser;
  // const owner = req.user._id;

  const teaId = req.query.teaId;

  try {
    let cart = await cartModel.findOne({ owner });
    const teaIndex = cart.teas.findIndex((tea) => tea.teaId == teaId);
    if (teaIndex > -1) {
      let tea = cart.teas[teaIndex];
      cart.total -= tea.quantity * tea.price;
      if (cart.total < 0) {
        cart.total = 0;
      }
      cart.teas.splice(teaIndex, 1);
      cart.total = cart.teas.reduce((acc, curr) => {
        return acc + curr.quantity * curr.price;
      }, 0);
      cart = await cart.save();
      res.status(200).send(cart);
    } else {
      res.status(404).send("tea not found");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

export { cartRouter };
