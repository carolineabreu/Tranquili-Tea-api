import { model, Schema } from "mongoose";

const commentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now() },
  title: { type: String, required: true, trim: true },
  body: { type: String, required: true },
  score: { type: Number, required: true },
  tea: { type: Schema.Types.ObjectId, ref: "Tea" }
});

export const CommentModel = model("Comment", commentSchema);
