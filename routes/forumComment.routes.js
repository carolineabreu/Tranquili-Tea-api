import express from "express";

import isAuth from "../middlewares/isAuth.js";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";

import { ForumCommentModel } from "../model/forumComment.model.js";
import { UserModel } from "../model/user.model.js";
import { ForumPostModel } from "../model/forumPost.model.js";

const forumCommentRouter = express.Router();

forumCommentRouter.post("/:postId/create", isAuth, attachCurrentUser, async (req, res) => {
  try {
    const { postId } = req.params;
    const loggedUser = req.currentUser;
    const comment = await ForumCommentModel.create({ ...req.body, owner: loggedUser._id, post: postId });

    await UserModel.findOneAndUpdate(
      { _id: loggedUser._id },
      { $push: { comments: comment } }
    );

    await ForumPostModel.findOneAndUpdate(
      { _id: postId },
      { $push: { comments: comment } }
    );

    return res.status(201).json(comment);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

forumCommentRouter.get("/:postId/all", async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await ForumPostModel.findOne({ _id: postId })
      .populate("comments")
      .populate("owner");

    const allComments = await ForumCommentModel.find({ post: postId }).populate("owner");

    return res.status(200).json(allComments);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

forumCommentRouter.get(
  "/all-comments",
  isAuth,
  attachCurrentUser,
  async (req, res) => {
    try {
      const loggedInUser = req.currentUser;
      const userComments = await ForumCommentModel.find(
        { owner: loggedInUser._id },
      ).populate("post").populate("owner");
      return res.status(200).json(userComments);
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  });

forumCommentRouter.patch("/edit/:id", isAuth, attachCurrentUser, async (res, req) => {
  try {
    const { id } = req.params;
    const comment = await CommentModel.findOne({ _id: id });

    const editComment = await ForumCommentModel.findOneAndUpdate(
      { _id: comment._id },
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
