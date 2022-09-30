import { Schema, model } from "mongoose";

const orderSchema = new Schema({
 // id: { id },
  status: { type: String, enum : ["", "", ""] required: true},
  quantity: { type: Number, required : true},
  priceTotal: { type: Number, required : true}, 
  passwordHash: { type: String, required: true },
  //teaID
  createdAt: { type: Date, default: Date.now() },
  endedAt : { type: Date, default: // Date.now + 15() },
});

export const OrderModel = model("Order", orderSchema);
