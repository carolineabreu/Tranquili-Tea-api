import { Schema, model } from "mongoose";

const forumPostSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "ForumProfile" },
  title: { type: String, required: true, trim: true },
  body: { type: String, required: true },
  image: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now() },
  tag: { type: Array, required: true },
  likes: { type: Schema.Types.ObjectId, ref: "ForumProfile" },
  comments: { type: Schema.Types.ObjectId, ref: "ForumComment" }
});

export const ForumPostModel = model("ForumPost", forumPostSchema);
