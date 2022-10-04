import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm,
  },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["ADMIN", "USER"], default: "USER" },
  createdAt: { type: Date, default: Date.now() },
  orders: { type: Schema.Types.ObjectId, ref: "Order" },
  reviews: { type: Schema.Types.ObjectId, ref: "Review" },
  teas: { type: Schema.Types.ObjectId, ref: "Tea" },
  forumProfile: { type: Schema.Types.ObjectId, ref: "ForumProfile", unique: true }
});

export const UserModel = model("User", userSchema);
