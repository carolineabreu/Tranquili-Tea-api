import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  teas: [{
    teaId: { type: Schema.Types.ObjectId, ref: "Tea", required: true, trim: true },
    name: { type: String },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1
    },
    price: { type: Number }
  }],
  total: { type: Number, required: true, default: 0 },
  createdAt: { type: Date, default: Date.now() }
});

export const cartModel = model("Cart", cartSchema);
