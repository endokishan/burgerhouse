import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
    name : { type : String, required : true},
    image : { type : String, required : true},
    price : { type : Number, required : true},
    summary : { type : String, required : true}
});

export default mongoose.model('Menu', menuSchema);