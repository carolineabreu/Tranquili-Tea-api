import { model, Schema } from "mongoose";

const ForumCommentSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  post: { type: Schema.Types.ObjectId, ref: "ForumPost" },
  createdAt: { type: Date, default: Date.now() },
  body: { type: String, required: true, trim: true },
});

export const ForumCommentModel = model("ForumComment", ForumCommentSchema);
