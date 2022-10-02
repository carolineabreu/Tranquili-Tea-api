import { Schema, model } from "mongoose";

const forumProfileSchema = new Schema({
  active: { type: Boolean, default: false },
  username: { type: Schema.Types.ObjectId, ref: "User", match: "username" },
  createdAt: { type: Date, default: Date.now() },
  posts: [{ type: Schema.Types.ObjectId, ref: "ForumPost" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "ForumComment" }],
  likes: [{ type: Schema.Types.ObjectId, ref: "ForumPost" }],
  role: { type: String, enum: ["MOD", "USER"], default: "USER" },
});

export const ForumProfileModel = model("ForumProfile", forumProfileSchema);
