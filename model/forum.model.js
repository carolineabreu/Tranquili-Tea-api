import { Schema, model } from "mongoose";

const forumSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true, trim: true },
  body: { type: String, required: true },
  image: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now() },
  tag: { type: Array, required: true },
  likes: { type: Schema.Types.ObjectId, ref: "User" },
  comments: { type: Schema.Types.ObjectId, ref: "Comment" },
  favoriteTeas: { type: Schema.Types.ObjectId, ref: "Tea" },
});

export const ForumModel = model("Forum", forumSchema);
