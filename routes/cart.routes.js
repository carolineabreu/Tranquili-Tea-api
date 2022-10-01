import express from "express";
import { cartModel } from "../model/cart.model.js";

const cartRouter = express.Router();

//CREATE
cartRouter.post("/checkout", async (req, res) => {
  try {
    const createdCart = await cartModel.create(req.body);

    return res.status(201).json(createdCart);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

//READ
cartRouter.get("/checkout", async (req, res) => {
  try {
    const allProducts = await cartModel.find();

    return res.status(200).json(cart);
  } catch (error) {
    console.log(error);

    return res.json(error);
  }
});

export { cartRouter };
