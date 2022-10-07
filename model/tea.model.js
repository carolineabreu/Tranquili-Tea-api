import { Schema, model } from "mongoose";

const teaSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  name: { type: String, trim: true, required: true },
  teaPicture: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSFbyPjIqZ3uqolWoR6E3W8WyITyQjBP_d-g&usqp=CAU",
  },
  description: { type: String, required: true, minLength: 3 },
  mood: {
    type: String,
    enum: ["Focused", "Anxious", "Moody", "Restless", "Stressed", "Tired"],
    required: true,
  },
  origin: { type: String, required: true },
  brew: { type: String, required: true },
  temperature: { type: Number, required: true },
  caffeine: { type: Boolean, default: false },
  flavour: { type: String, required: true },
  ingredients: { type: String, required: true },
  price: { type: Number, required: true },
  reviews: { type: Schema.Types.ObjectId, ref: "Review" },
});

export const TeaModel = model("Tea", teaSchema);
