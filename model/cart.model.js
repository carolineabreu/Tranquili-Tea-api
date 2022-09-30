import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  product: [
    (quantity = { type: Number, required: true }),
    (price = { type: Number, required: true }),
  ],
  totalPrice: { type: Number, required: true },
  zipCode: { type: Number },
  dicountCoupons: { type: String },
});

export const cartModel = model("Cart", cartSchema);
