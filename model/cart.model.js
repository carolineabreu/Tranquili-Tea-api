import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  cart: {
    teas: { type: Schema.Types.ObjectId, ref: "Product" },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  },
  zipCode: { type: Number },
  discountCoupons: { type: String },
  paymentMethod: { type: String },
});

export const cartModel = model("Cart", cartSchema);
