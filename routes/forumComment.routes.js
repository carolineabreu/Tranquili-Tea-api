import express from "express";
import { ForumCommentModel } from "../model/forumComment.model.js";

const forumCommentRouter = express.Router();

forumCommentRouter.post("/", async (req, res) => {
  try {
    const comment = await ForumCommentModel.create({ ...req.body });

    return res.status(201).json(comment);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

forumCommentRouter.get("/", async (req, res) => {
  try {
    const allComments = await ForumCommentModel.find();

    return res.status(200).json(allComments);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

forumCommentRouter.get("/:id", async (res, req) => {
  try {
    const comment = await ForumCommentModel.findOne({ _id: req.params.id });

    return res.status(200).json(comment);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

forumCommentRouter.put("/:id", async (res, req) => {
  try {
    const editComment = await ForumCommentModel.findOneAndUpdate(
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

forumCommentRouter.delete(":id", async (req, res) => {
  try {
    const deleteComment = await ForumCommentModel.deleteOne({ _id: req.params.id });

    return res.status(200).json(deleteComment);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

export { forumCommentRouter };
