import { Schema, model } from "mongoose";

const teaSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  name: {type: String, trim:true, required:true},
  teaPicture: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSFbyPjIqZ3uqolWoR6E3W8WyITyQjBP_d-g&usqp=CAU",
  },
  description: { type: String, required: true, minLength: 3},
  indication: {
    type: String,
    enum: ["Focus", "Anxiety", "Moodiness", "Restless", "Stress", "Tiredness", "Alertness", "Relaxation", "Sleep", "Energy", "Stimulant", "Antioxidant"],
    required: true,
  },
  origin: { type: String, required: true },
  brew: { type: String, required: true },
  temperature: { type: Number, required: true },
  caffeine: { type: Boolean, default: false },
  flavour: { type: String, required: true },
  ingredients: { type: String, required: true },
  price: { type: Number, required: true },
  review: { type: Schema.Types.ObjectId, ref: "Comment" },
});

export const TeaModel = model("Tea", teaSchema);
