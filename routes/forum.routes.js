import express from "express";
import isAuth from "../middlewares/isAuth.js";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { ForumModel } from "../model/forum.model.js";
import { UserModel } from "../model/user.model.js";

const forumRouter = express.Router();

forumRouter.post(
  "/new-post",
  isAuth,
  attachCurrentUser,
  async (req, res) => {
    try {
      const loggedUser = req.currentUser;

      const post = await ForumModel.create({ ...req.body, owner: loggedUser._id });

      await UserModel.findOneAndUpdate(
        { _id: loggedUser._id },
        { $push: {} }
      );

      return res.status(201).json(createdPost);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });

//FIXME: essa rota vai pegar todos os posts do fórum ou do usuário?
forumRouter.get(
  "/",
  isAuth,
  attachCurrentUser,
  isAdmin,
  async (req, res) => {
    try {
      const allPosts = await ForumModel.find();

      return res.status(200).json(allPosts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });

/**
 * TODO:
 * - [] get all posts => quem é MOD tem acesso a todos os posts do fórum
 * - [] get all your posts => o usuário tem acesso a todos os seus posts já feitos
 */

/** 
 * FIXME: se o MOD for pegar um post por id, ele pode pegar qualquer post, mas se for um usuário ele só pode ter acesso aos posts dele por id. O que muda? Ou não muda?
*/
forumRouter.get(
  "/:id",
  isAuth,
  attachCurrentUser,
  async (res, req) => {
    try {
      const post = await ForumModel.findOne({ _id: req.params.id });

      return res.status(200).json(post);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });

forumRouter.put(
  "/:id",
  isAuth,
  attachCurrentUser,
  async (res, req) => {
    try {
      const editPost = await ForumModel.findOneAndUpdate(
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
forumRouter.delete(
  ":id",
  isAuth,
  attachCurrentUser,
  async (req, res) => {
    try {
      const deletePost = await ForumModel.deleteOne({ _id: req.params.id });

      return res.status(200).json(deletePost);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });

export { forumRouter };
