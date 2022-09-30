import { Schema, model }  from "mongoose";

const teaSchema = new Schema ({
    name : { type: Schema.Types.ObjectId, ref: "User" },
    image : { data: Buffer, contentType: String},
    description: {type: String}, 
    indication:{type: String},
    origin: {type: String},
    brew: {type: String},
    temperature:  {type: Number}, 
    caffeine: {type: Boolean, default: false} ,
    flavour: {type: String},
    ingredients: {type: String}
})

export const TeaModel = model("Tea", teaSchema);
