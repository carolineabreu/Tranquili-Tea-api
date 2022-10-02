import { Schema, model } from "mongoose";

const forumPostSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "ForumProfile" },
  title: { type: String, required: true, trim: true },
  body: { type: String, required: true },
  image: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now() },
  tag: { type: Array, required: true },
  likes: { type: Schema.Types.ObjectId, ref: "User" },
  comments: { type: Schema.Types.ObjectId, ref: "Comment" },
  favoriteTeas: { type: Schema.Types.ObjectId, ref: "Tea" },
});

export const ForumPostModel = model("ForumPost", forumPostSchema);
