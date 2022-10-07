import express from "express";
import { OrderModel } from "../model/order.model.js";
import isAuth from "../middlewares/isAuth.js";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";
import { UserModel } from "../model/user.model.js";

const orderRouter = express.Router();

//Create
orderRouter.post("/", isAuth, attachCurrentUser, async (req, res) => {
  try {
    const { teaId } = req.params;
    const loggedUser = req.currentUser;
    const createdOrder = await OrderModel.create({ ...req.body, user: loggedUser._id, teas: teaId });

    await UserModel.findOneAndUpdate(
      { _id: loggedUser._id },
      { $push: { orders: createdOrder } }
    );

    return res.status(201).json(createdOrder);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//Read
orderRouter.get("/all-orders", isAuth, attachCurrentUser, async (req, res) => {
  const owner = req.user._id;
  try {
    const order = await OrderModel.find({ owner: owner }).sort({ date: -1 });
    if (order) {
      return res.status(200).send(order);
    }
    res.status(404).send("No orders found");
  } catch (error) {
    res.status(500).send();
  }
});

//Read Details
orderRouter.get("/:id", async (req, res) => {
  try {
    const order = await OrderModel.findOne({ _id: req.params.id }).populate("user");

    return res.status(200).json(order);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

orderRouter.get(
  "/:id/all-orders",
  isAuth,
  attachCurrentUser,
  async (req, res) => {
    try {
      const loggedUser = req.currentUser;

      const orders = await OrderModel.find(
        { user: loggedUser._id },
      );

      return res.status(200).json(orders);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });

orderRouter.patch("/edit/:id", isAuth, attachCurrentUser, async (req, res) => {
  try {
    const loggedUser = req.currentUser;
    const order = await OrderModel.findOne({
      _id:
        req.params.id
    });
    if (String(order.user) !== String(loggedUser._id)) {
      return res.status(500).json({ msg: "you can't edit this" });
    }
    const editedOrder = await OrderModel.findOneAndUpdate(
      { _id: order._id },
      { ...req.body },
      { new: true, runValidators: true }
    );

    return res.status(200).json(editedOrder);
  } catch (erro) {
    console.log(erro);
    return res.status(500).json(erro);
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
