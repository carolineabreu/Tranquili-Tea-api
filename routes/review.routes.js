import express from "express";
import { ReviewModel } from "../model/review.model.js";
import isAuth from "../middlewares/isAuth.js";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";

const reviewRouter = express.Router();

reviewRouter.post("/", isAuth, attachCurrentUser, async (req, res) => {
  try {
    const createdReview = await ReviewModel.create({ ...req.body });

    return res.status(201).json(createdReview);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

reviewRouter.get("/all", isAuth, attachCurrentUser, async (req, res) => {
  try {
    const allReviews = await ReviewModel.find();

    return res.status(200).json(allReviews);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

reviewRouter.get("/:id", isAuth, attachCurrentUser, async (res, req) => {
  try {
    //FIXME:
    const review = await ReviewModel.findOne({ _id: req.params.id }).populate("user", "tea");

    return res.status(200).json(review);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

reviewRouter.put("/edit/:id", isAuth, attachCurrentUser, async (res, req) => {
  try {
    const editReview = await ReviewModel.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true, runValidators: true }
    );

    return res.status(200).json(editReview);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

reviewRouter.delete("/delete/:id", isAuth, attachCurrentUser, async (req, res) => {
  try {
    const deleteReview = await ReviewModel.deleteOne({ _id: req.params.id });

    return res.status(200).json(deleteReview);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

export { reviewRouter };
