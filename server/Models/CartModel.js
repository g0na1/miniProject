import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  name: String,
  price: Number,
  imageUrl: String,
  quantity: { type: Number, default: 1 },
});

export default mongoose.model("Cart", cartSchema);
