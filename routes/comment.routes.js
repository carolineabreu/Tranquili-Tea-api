import express from "express";
import { CommentModel } from "../model/comment.model.js";

const commentRouter = express.Router();

commentRouter.post("/", async (req, res) => {
  try {
    const createdComment = await CommentModel.create({ ...req.body });

    return res.status(201).json(createdComment);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

commentRouter.get("/", async (req, res) => {
  try {
    const allComments = await CommentModel.find();

    return res.status(200).json(allComments);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

/**
 * TODO:
 * - [] criar uma rota que pega todos os comentários pelo ID do chá para listar na página do chá
 */

commentRouter.get("/:id", async (res, req) => {
  try {
    const comment = await CommentModel.findOne({ _id: req.params.id });

    return res.status(200).json(comment);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

commentRouter.put("/:id", async (res, req) => {
  try {
    const editComment = await CommentModel.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true, runValidators: true }
    );

    return res.status(200).json(editComment);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

commentRouter.delete(":id", async (req, res) => {
  try {
    const deleteComment = await CommentModel.deleteOne({ _id: req.params.id });

    return res.status(200).json(deleteComment);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

export { commentRouter };
