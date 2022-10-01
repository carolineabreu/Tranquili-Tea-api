import express from "express";
import { orderModel } from "../model/cart.model.js";

const orderRouter = express.Router();

//CREATE
orderRouter.post("/", async (req, res) => {
  try {
    const createdOrder = await orderModel.create(req.body);

    return res.status(201).json(createdOrder);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

//READ
orderRouter.get("/", async (req, res) => {
  try {
    const allOrders = await orderModel.find();

    return res.status(200).json(allOrders);
  } catch (error) {
    console.log(error);

    return res.json(error);
  }
});

//READ DETAILS

orderRouter.get("/:id", async (req, res) => {
  try {
    const order = await orderModel.findOne({ _id: req.params.id });

    return res.status(200).json(order);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

//UPDATE

orderRouter.put("/:id", async (req, res) => {
  try {
    const editProduct = await orderModel.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true, runValidators: true }
    );

    return res.status(200).json(editOrder);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

//DELETE

orderRouter.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await ProductModel.deleteOne({ _id: req.params.id });

    return res.status(200).json(deletedOrder);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

export { orderRouter };
