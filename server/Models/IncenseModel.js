import mongoose from "mongoose";

const IncenseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String }, 
  },
  { timestamps: true }
);

const IncenseModel = mongoose.model("Incense", IncenseSchema);
export default IncenseModel;
