import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  order: {
    id: { type: Schema.Types.ObjectId },
    teas: { type: Schema.Types.ObjectId, ref: "Product" },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  },
  status: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
});

export const orderModel = model("Order", orderSchema);
