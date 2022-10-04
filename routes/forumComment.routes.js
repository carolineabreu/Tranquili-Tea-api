import express from "express";
import { ForumCommentModel } from "../model/forumComment.model.js";
import isAuth from "../middlewares/isAuth.js";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";

const forumCommentRouter = express.Router();

forumCommentRouter.post("/", isAuth, attachCurrentUser, async (req, res) => {
  try {
    const comment = await ForumCommentModel.create({ ...req.body });

    return res.status(201).json(comment);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

forumCommentRouter.get("/all", isAuth, attachCurrentUser, async (req, res) => {
  try {
    const allComments = await ForumCommentModel.find();

    return res.status(200).json(allComments);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

forumCommentRouter.get("/:id", isAuth, attachCurrentUser, async (res, req) => {
  try {
    // FIXME:
    const comment = await ForumCommentModel.findOne({ _id: req.params.id }).populate("user", "post");

    return res.status(200).json(comment);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

forumCommentRouter.put("/edit/:id", isAuth, attachCurrentUser, async (res, req) => {
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

forumCommentRouter.delete("/delete/:id", isAuth, attachCurrentUser, async (req, res) => {
  try {
    const deleteComment = await ForumCommentModel.deleteOne({ _id: req.params.id });

    return res.status(200).json(deleteComment);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

export { forumCommentRouter };
