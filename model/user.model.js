import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true, trim: true },
  username: { type: String, required: true, trim: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm,
  },
  passwordHash: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  address: { type: String, minLength: 10 },
  role: { type: String, enum: ["ADMIN", "USER"], default: "USER" },
  createdAt: { type: Date, default: Date.now() },
  about: { type: String },
  picture: { type: String, default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIy2vRwSRoUACatub962auO36Uo5OjNQ5wCQ&usqp=CAU" },
  backgroundColor: { type: String, default: "#BBDEFB" },
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  teas: [{ type: Schema.Types.ObjectId, ref: "Tea" }],
  posts: [{ type: Schema.Types.ObjectId, ref: "ForumPost" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "ForumComment" }],
});

export const UserModel = model("User", userSchema);
