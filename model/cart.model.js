import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  product: [
    (quantity = { type: Number, required: true }),
    (price = { type: Number, required: true }),
  ],
  totalPrice: { type: Number, required: true },
  zipCode: { type: Number },
  discountCoupons: { type: String },
  // role: { type: String, enum: ["ADMIN", "USER"], default: "USER" },
});

export const cartModel = model("Cart", cartSchema);
