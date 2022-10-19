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
  category: [{
    type: String,
    enum: ["Anxiety", "Moodiness", "Restlessness", "Stress", "Tiresome", "Focus"],
    required: true,
  }],
  origin: { type: String, required: true },
  brew: { type: String, required: true },
  temperature: { type: Number, required: true },
  flavour: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  caffeine:[{type:String, required:true}],
  price: { type: Number, required: true },
  reviews: { type: Schema.Types.ObjectId, ref: "Review" },
});

export const TeaModel = model("Tea", teaSchema);
