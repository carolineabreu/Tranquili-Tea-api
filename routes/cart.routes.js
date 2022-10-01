import express from "express";
import isAuth from "../middlewares/isAuth.js";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";
import { UserModel } from "../model/user.model.js";
import { cartModel } from "../model/cart.model.js";

const orderRouter = express.Router();

//qualquer user . findAll()
// como puxar o cart para dentro ?
// data.push
cartModel();

orderRouter.post("/order", async (req, res, next) => {
  try {
    data.push(currentCart);

    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res
        .status(404)
        .json({ msg: "Please Log in or Sign up to proceed to Checkout" })
        .redirect("/signup");
      next("/order:id");
    } else {
      return res.status(200).json(req.currentCart).redirect("/order:id");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

orderRouter.get(isAuth, attachCurrentUser, async (req, res) => {
  return res.status(200).json(req.currentCart).redirect("/order:id");
});

//UPDATE

//DELETE

export { orderRouter };
