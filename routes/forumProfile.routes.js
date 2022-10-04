import express from "express";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";
import isAuth from "../middlewares/isAuth.js";
import { ForumProfileModel } from "../model/forumProfile.model.js";
import { UserModel } from "../model/user.model.js";

const forumProfileRouter = express.Router();

forumProfileRouter.post(
  "/",
  isAuth,
  attachCurrentUser,
  async (req, res) => {
    try {
      const loggedUser = req.currentUser;

      const createProfile = await ForumProfileModel.create({
        ...req.body,
      });

      await UserModel.findOneAndUpdate(
        { id: loggedUser._id },
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
  "/profile",
  isAuth,
  attachCurrentUser,
  async (req, res) => {
    const loggedUser = req.currentUser;
    const profile = await ForumProfileModel.findOne({ _id: loggedUser._id }).populate("posts", "comments", "likes");
    return res.status(200).json(profile);
  }
);

forumProfileRouter.put(
  "/edit/:id",
  isAuth,
  attachCurrentUser,
  async (req, res) => {
    try {
      const loggedUser = req.currentUser;
      const profile = await ForumProfileModel.findOne({ _id: loggedUser._id });

      const editedProfile = await ForumProfileModel.findOneAndUpdate(
        { _id: profile._id },
        { ...req.body },
        { new: true, runValidators: true },
      );
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
);

export { forumProfileRouter };
