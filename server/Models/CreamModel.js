import mongoose from "mongoose";

const CreamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String }, // سنحفظ رابط الصورة (Base64 أو رابط رفع)
}, { timestamps: true });

const CreamModel = mongoose.model("Cream", CreamSchema);
export default CreamModel;
