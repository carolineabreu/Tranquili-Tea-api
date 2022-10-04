import { model, Schema } from "mongoose";

const ForumCommentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "ForumProfile" },
  post: { type: Schema.Types.ObjectId, ref: "ForumPost" },
  createdAt: { type: Date, default: Date.now() },
  body: { type: String, required: true, trim: true },
  //likes: [{ type: Schema.Types.ObjectId, ref: "ForumProfile" }]
});

export const ForumCommentModel = model("ForumComment", ForumCommentSchema);
