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
  username: { type: String, required: true, trim: true, unique: true },
  role: { type: String, enum: ["ADMIN", "MOD", "USER"], default: "USER" },
  createdAt: { type: Date, default: Date.now() },
  orders: { type: Schema.Types.ObjectId, ref: "Order" },
  comments: { type: Schema.Types.ObjectId, ref: "Comment" },
  teas: { type: Schema.Types.ObjectId, ref: "Tea" },
});

export const UserModel = model("User", userSchema);
