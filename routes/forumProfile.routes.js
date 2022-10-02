// na hora do post ("criação"), pegar do User só o username
// TODO:essa rota só vai ser "ativada" se o boolean trocar de false para true => ver aula de sexta
import express from "express";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";
import isAuth from "../middlewares/isAuth.js";
import { isMod } from "../middlewares/isMod.js";
import { ForumProfileModel } from "../model/forumProfile.model.js";
import { UserModel } from "../model/user.model.js";

const forumProfileRouter = express.Router();

forumProfileRouter.post(
  "/profile",
  isAuth,
  attachCurrentUser,
  async (req, res) => {
    try {
      const loggedUser = req.currentUser;

      const createProfile = await ForumProfileModel.create({
        ...req.body,
        username: loggedUser.username
      });

      // TODO: o forum profile receberia as informações do User, mas só usaria o username. Como fazer o populate pro User?
      await UserModel.findOneAndUpdate(
        { username: loggedUser.username },
        { $push: { forumProfile: createProfile._id } }
      );

      return res.status(201).json(createProfile);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
);

forumProfileRouter.get(
  "/all",
  isMod,
  async (req, res) => {
    try {
      const profiles = await ForumProfileModel.find();

      return res.status(200).json(profiles);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
);

forumProfileRouter.get(
  "/:id",
  isMod,
  async (req, res) => {
    try {
      const profile = await ForumProfileModel.findOne({ _id: req.params._id });

      return res.status(200).json(profile);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
);

export { forumProfileRouter };
