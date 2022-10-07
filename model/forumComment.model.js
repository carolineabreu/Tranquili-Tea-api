import { model, Schema } from "mongoose";

const ForumCommentSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User", trim: true },
  post: { type: Schema.Types.ObjectId, ref: "ForumPost", trim: true },
  createdAt: { type: Date, default: Date.now() },
  comment: { type: String, required: true },
});

export const ForumCommentModel = model("ForumComment", ForumCommentSchema);
