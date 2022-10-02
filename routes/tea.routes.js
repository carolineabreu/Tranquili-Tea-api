import express, { json } from "express";
import isAuth from "../middlewares/isAuth.js";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";
import { UserModel } from "../model/user.model.js";
import { TeaModel } from "../model/tea.model.js";

const teaRouter = express.Router();

teaRouter.post("/new-tea", isAuth, attachCurrentUser, async (req, res) => {
  try {
    const loggedUser = req.currentUser;

    const tea = await TeaModel.create({
      ...req.body,
      owner: loggedUser._id,
    });

    await TeaModel.findOneAndUpdate(
      { _id: loggedUser._id },
      { $push: { teas: tea._id } }
    );

    return res.status(201).json(tea);
  } catch (erro) {
    console.log(erro);
    return res.status(500).json(erro);
  }
});

teaRouter.get("/all", async (req, res) => {
  try {
    const teas = await TeaModel.find();

    return res.status(200).json(teas);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

teaRouter.patch("/edit/:id", isAuth, attachCurrentUser, async (req, res) => {
  try {
    const loggedUser = req.currentUser;
    const tea = await TeaModel.findOne({ _id: req.params.id });
    if (String(tea.owner) !== String(loggedUser._id)) {
      return res.status(500).json({ msg: "you can't edit this" });
    }
    const editedTea = await TeaModel.findOneAndUpdate(
      { _id: tea._id },
      { ...req.body },
      { new: true, runValidators: true }
    );

    return res.status(200).json(editedTea);
  } catch (erro) {
    console.log(erro);
    return res.status(500).json(erro);
  }
});

export { teaRouter };
