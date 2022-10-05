import express from "express";
import { cartModel } from "../model/cart.model.js";
import isAuth from "../middlewares/isAuth.js";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";

const cartRouter = express.Router();

//Create
cartRouter.post("/", async (req, res) => {
  try {
    const createdCart = await cartModel.create({ ...req.body });

    return res.status(201).json(createdCart);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

//Read
cartRouter.get("/all", isAuth, attachCurrentUser, async (req, res) => {
  try {
    const allCart = await cartModel.find();

    return res.status(200).json(allCart);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

//Read Details
cartRouter.get("/:id", isAuth, attachCurrentUser, async (res, req) => {
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
cartRouter.put("/edit/:id", isAuth, attachCurrentUser, async (res, req) => {
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
cartRouter.delete(
  "/delete/:id",
  isAuth,
  attachCurrentUser,
  async (req, res) => {
    try {
      const deletedCart = await cartModel.deleteOne({
        _id: req.params.id,
      });

      return res.status(200).json(deletedCart);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
);

export { cartRouter };
