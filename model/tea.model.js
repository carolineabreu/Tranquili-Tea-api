import { Schema, model }  from "mongoose";

const teaSchema = new Schema ({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    tea: { type: Schema.Types.ObjectId, ref: "Tea" },
    teaPicture : { 
    Type: String,
    default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSFbyPjIqZ3uqolWoR6E3W8WyITyQjBP_d-g&usqp=CAU",
    },
    description: {type: String, required: true}, 
    indication:[{type: String}],
    origin: {type: String},
    brew: {type: String, },
    temperature:  {type: Number, required: true},
    caffeine: {type: Boolean, default: false} ,
    flavour: {type: String},
    ingredients: [{type: String}],
    price: {type: Number},
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],

})

export const TeaModel = model("Tea", teaSchema);
