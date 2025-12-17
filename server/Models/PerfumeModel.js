import mongoose from "mongoose";

const PerfumeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

const PerfumeModel = mongoose.model("Perfume", PerfumeSchema);
export default PerfumeModel;
