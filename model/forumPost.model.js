import { Schema, model } from "mongoose";

const forumPostSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "ForumProfile" },
  title: { type: String, required: true, trim: true, minLength: 10, maxLength: 200 },
  body: { type: String, required: true },
  image: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now() },
  tag: { type: String, required: true, enum: ["Question", "Recommendation", "Photo", "Review", "Discussion"] },
  likes: { type: Schema.Types.ObjectId, ref: "ForumProfile" },
  comments: { type: Schema.Types.ObjectId, ref: "ForumComment" }
});

export const ForumPostModel = model("ForumPost", forumPostSchema);
