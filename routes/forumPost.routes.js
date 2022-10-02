import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { isMod } from "../middlewares/isMod.js";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";
import { ForumPostModel } from "../model/forumPost.model.js";
import { UserModel } from "../model/user.model.js";

const forumPostRouter = express.Router();

forumPostRouter.post(
  "/new-post",
  isAuth,
  attachCurrentUser,
  async (req, res) => {
    try {
      const loggedUser = req.currentUser;

      const post = await ForumPostModel.create({ ...req.body, owner: loggedUser._id });

      await UserModel.findOneAndUpdate(
        { _id: loggedUser._id },
        { $push: {} }
      );

      return res.status(201).json(post);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });

forumPostRouter.get(
  "/all",
  isAuth,
  attachCurrentUser,
  async (req, res) => {
    try {
      const allPosts = await ForumPostModel.find();

      return res.status(200).json(allPosts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });


forumPostRouter.get(
  "/:id",
  isAuth,
  attachCurrentUser,
  async (res, req) => {
    try {
      const post = await ForumPostModel.findOne({ _id: req.params.id });

      return res.status(200).json(post);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });

// MODs tem acesso a todos os posts do forum por ID
forumPostRouter.get(
  "/mod/:id",
  isAuth,
  attachCurrentUser,
  isMod,
  async (res, req) => {
    try {
      const post = await ForumPostModel.findOne({ _id: req.params.id });

      return res.status(200).json(post);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });

forumPostRouter.put(
  "/:id",
  isAuth,
  attachCurrentUser,
  async (res, req) => {
    try {
      const editPost = await ForumPostModel.findOneAndUpdate(
        { _id: req.params.id },
        { ...req.body },
        { new: true, runValidators: true }
      );

      return res.status(200).json(editPost);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });



/**
 * TODO:
 * -[] se sobrar tempo colocar a opção de tanto o usuário poder deletar seu post, quando um MOD poder excluir algum post.
 */
forumPostRouter.delete(
  ":id",
  isAuth,
  attachCurrentUser,
  async (req, res) => {
    try {
      const deletePost = await ForumPostModel.deleteOne({ _id: req.params.id });

      return res.status(200).json(deletePost);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });

export { forumPostRouter };
