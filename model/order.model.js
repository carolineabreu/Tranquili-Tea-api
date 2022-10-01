import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  status: { type: String, required: true },
  quantity: { type: Number, required: true }, // ?
  priceTotal: { type: Number, required: true },
  //teaID
  createdAt: { type: Date, default: Date.now() },
  endedAt: { type: Date, default: new Date() },
});

export const orderModel = model("Order", orderModel);
