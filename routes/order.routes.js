import express from "express";
import { orderModel } from "../model/order.model.js";
import isAuth from "../middlewares/isAuth.js";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";
import { UserModel } from "../model/user.model.js";

const orderRouter = express.Router();

//Create
orderRouter.post("/", async (req, res) => {
  try {
    const createdOrder = await orderModel.create({ ...req.body });

    return res.status(201).json(createdOrder);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//Read
orderRouter.get("/all", isAuth, attachCurrentUser, async (req, res) => {
  try {
    const loggedUser = req.currentUser;
    await UserModel.findOne({ id: loggedUser._id });

    const allOrders = await orderModel.find();

    return res.status(200).json(allOrders);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//Read Details
orderRouter.get("/:id", isAuth, attachCurrentUser, async (req, res) => {
  try {
    const loggedUser = req.currentUser;
    await UserModel.findOne({ _id: loggedUser._id });

    const order = await orderModel.findOne({ _id: req.params.id });

    return res.status(200).json(order);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//Delete
orderRouter.delete(
  "/delete/:id",
  isAuth,
  attachCurrentUser,
  async (req, res) => {
    try {
      const deletedOrder = await OrderModel.deleteOne({ _id: req.params.id });

      return res.status(200).json(deletedOrder);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
);

export { orderRouter };
