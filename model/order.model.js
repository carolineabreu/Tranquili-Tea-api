import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  teas: [{
    teaId: { type: Schema.Types.ObjectId, ref: "Tea", required: true },
    name: String,
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1
    },
    price: Number
  }],
  total: { type: Number, required: true, default: 0 },
  createdAt: { type: Date, default: Date.now() }
});

export const OrderModel = model("Order", orderSchema);
