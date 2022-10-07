import { Schema, model } from "mongoose";

const forumPostSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true, trim: true, minLength: 10, maxLength: 200 },
  body: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  tag: { type: String, required: true, enum: ["Question", "Recommendation", "Blog", "Review", "Discussion"] },
  comments: [{ type: Schema.Types.ObjectId, ref: "ForumComment" }]
});

export const ForumPostModel = model("ForumPost", forumPostSchema);
