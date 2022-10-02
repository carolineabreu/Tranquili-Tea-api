import express from "express";
import { ReviewModel } from "../model/review.model.js";

const reviewRouter = express.Router();

reviewRouter.post("/", async (req, res) => {
  try {
    const createdReview = await ReviewModel.create({ ...req.body });

    return res.status(201).json(createdReview);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

reviewRouter.get("/", async (req, res) => {
  try {
    const allReviews = await ReviewModel.find();

    return res.status(200).json(allReviews);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

reviewRouter.get("/:id", async (res, req) => {
  try {
    const review = await ReviewModel.findOne({ _id: req.params.id });

    return res.status(200).json(review);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

reviewRouter.put("/:id", async (res, req) => {
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

reviewRouter.delete(":id", async (req, res) => {
  try {
    const deleteReview = await ReviewModel.deleteOne({ _id: req.params.id });

    return res.status(200).json(deleteReview);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

export { reviewRouter };
