import { Schema, model } from "mongoose";

const forumProfileSchema = new Schema({
  username: { type: String, required: true, trim: true, unique: true },
  avatar: { type: String, default: "" },
  backgroundImage: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now() },
  posts: [{ type: Schema.Types.ObjectId, ref: "ForumPost" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "ForumComment" }],
  //likes or upVotes?
  likes: [{ type: Schema.Types.ObjectId, ref: "ForumPost" }],
});

export const ForumProfileModel = model("ForumProfile", forumProfileSchema);
