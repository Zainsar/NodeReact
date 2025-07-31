import mongoose from "mongoose";
// const Schema= mongoose.Schema;
const { Schema } = mongoose;
const BrandsSchema = new Schema({
  title: { type: String, required: [true, "Title is Required"] },
  description: { type: String },
});

const Brands = mongoose.model("Brands", BrandsSchema);
export default Brands;