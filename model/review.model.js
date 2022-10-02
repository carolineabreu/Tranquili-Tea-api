import { model, Schema } from "mongoose";

const reviewSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  tea: { type: Schema.Types.ObjectId, ref: "Tea" },
  createdAt: { type: Date, default: Date.now() },
  title: { type: String, required: true, trim: true },
  body: { type: String, required: true },
  score: { type: Number, required: true },
});

export const ReviewModel = model("Review", reviewSchema);
