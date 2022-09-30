import express from "express";
import { ForumModel } from "../model/forum.model.js";

const forumRouter = express.Router();

forumRouter.post("/", async (req, res) => {
  try {
    const createdPost = await ForumModel.create({ ...req.body });

    return res.status(201).json(createdPost);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//FIXME: essa rota vai pegar todos os posts do fórum ou do usuário?
forumRouter.get("/", async (req, res) => {
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
forumRouter.get("/:id", async (res, req) => {
  try {
    const post = await ForumModel.findOne({ _id: req.params.id });

    return res.status(200).json(post);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

forumRouter.put("/:id", async (res, req) => {
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
forumRouter.delete(":id", async (req, res) => {
  try {
    const deletePost = await ForumModel.deleteOne({ _id: req.params.id });

    return res.status(200).json(deletePost);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

export { forumRouter };