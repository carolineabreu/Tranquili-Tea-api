import express from "express";
import isAuth from "../middlewares/isAuth.js";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";
import { UserModel } from "../model/user.model.js";
import { cartModel } from "..cart.model";
import { orderModel } from "../model/order.model.js";

const cartRouter = express.Router();

// get ou post?
cartRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res
        .status(404)
        .json({ msg: "Please Sign up to proceed to Checkout" });
    }

    if (await bcrypt.compare(password, user.passwordHash)) {
      const token = generateToken(user);

      return res.status(200).json({
        user: {
          name: user.name,
          email: user.email,
          _id: user._id,
          role: user.role,
        },
        // token: token,
      });
    } else {
      return res.status(401).json({ msg: "Email ou senha invalidos." });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

userRouter.get(isAuth, attachCurrentUser, async (req, res) => {
  return res.status(200).json(req.currentCart);
});

export { cartRouter };
