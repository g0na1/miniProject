import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import path from "path";
import multer from "multer";
import UserModel from "./Models/UserModel.js";
import adminModel from "./Models/adminModel.js";
import CreamModel from "./Models/CreamModel.js";
import IncenseModel from "./Models/IncenseModel.js";
import PerfumeModel from "./Models/PerfumeModel.js";
import Cart from "./Models/CartModel.js";
import dotenv from 'dotenv'
dotenv.config()
const app = express();
app.use(express.json());
app.use(cors());

app.use('/uploads', express.static('uploads'));

const connectString =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@minicluster.luclkxl.mongodb.net/beauty?appName=miniCluster`; 

async function main() {
  try {
    await mongoose.connect(connectString);
    console.log("Connected to MongoDB");
    await createAdmin();
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

async function createAdmin() {
  const existingAdmin = await adminModel.findOne({ email: "ghosoon@gmail.com" });
  if (existingAdmin) {
    console.log("Admin already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash("123456", 10);
  await adminModel.create({ email: "ghosoon@gmail.com", password: hashedPassword });
  console.log("Admin created successfully");
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (extname) {
      return cb(null, true);
    } else {
      cb(new Error('Error: File type not supported!')); 
    }
  }
});

const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ msg: err.message || "An unexpected error occurred." });
};

app.post("/registerUser", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ name, email, password: hashedPassword });
    await user.save();
    res.send({ user, msg: "User added successfully." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred during user registration." });
  }
});

// User login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(401).json({ msg: "Invalid email!" });
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json({ msg: "Incorrect password!" });
    res.status(200).json({ user, msg: "Authentication successful" });
  } catch (error) {
    res.status(500).json({ msg: "An unexpected error occurred" });
  }
});

// Admin login
app.post("/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await adminModel.findOne({ email });
    if (!admin) return res.status(401).json({ msg: "Admin email not found" });
    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) return res.status(401).json({ msg: "Incorrect admin password" });
    res.json({ msg: "Admin login successful", admin });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

app.post("/creams/add", async (req, res) => {
  try {
    const { name, price, description, imageUrl } = req.body; // إضافة imageUrl
    const newCream = await CreamModel.create({ name, price, description, imageUrl });
    res.send({ msg: "Cream added successfully", cream: newCream });
  } catch (error) {
    console.error("Error adding cream:", error);
    res.status(500).send({ msg: "Error adding cream" });
  }
});
app.get("/creams", async (req, res) => {
  try {
    const creams = await CreamModel.find();
    res.json(creams);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching creams" });
  }
});
app.put("/creams/update/:id", async (req, res) => {
  try {
    const { name, price, description, imageUrl } = req.body; // إضافة imageUrl
    const updateData = { name, price, description, imageUrl }; // تعديل هنا
    const updated = await CreamModel.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json({ msg: "Cream updated", cream: updated });
  } catch (error) {
    res.status(500).json({ msg: "Error updating cream" });
  }
});

app.delete("/creams/delete/:id", async (req, res) => {
  try {
    await CreamModel.findByIdAndDelete(req.params.id);
    res.json({ msg: "Cream deleted" });
  } catch (error) {
    res.status(500).json({ msg: "Error deleting cream" });
  }
});

app.post("/incense/add", async (req, res) => {
  try {
    const { name, price, description, imageUrl } = req.body; // إضافة imageUrl
    const newIncense = await IncenseModel.create({ name, price, description, imageUrl });
    res.send({ msg: "Incense added successfully", incense: newIncense });
  } catch (error) {
    console.error("Error adding incense:", error);
    res.status(500).send({ msg: "Error adding incense" });
  }
});

app.get("/incense", async (req, res) => {
  try {
    const incense = await IncenseModel.find();
    res.json(incense);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching incense" });
  }
});

app.put("/incense/update/:id", async (req, res) => {
  try {
    const { name, price, description, imageUrl } = req.body; // إضافة imageUrl
    const updateData = { name, price, description, imageUrl }; // تعديل هنا
    const updated = await IncenseModel.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json({ msg: "Incense updated", incense: updated });
  } catch (error) {
    res.status(500).json({ msg: "Error updating incense" });
  }
});

app.delete("/incense/delete/:id", async (req, res) => {
  try {
    await IncenseModel.findByIdAndDelete(req.params.id);
    res.json({ msg: "Incense deleted" });
  } catch (error) {
    res.status(500).json({ msg: "Error deleting incense" });
  }
});

app.post("/perfumes/add", async (req, res) => {
  try {
    const { name, price, description, imageUrl } = req.body; // إضافة imageUrl
    const newPerfume = await PerfumeModel.create({ name, price, description, imageUrl });
    res.send({ msg: "Perfume added successfully", perfume: newPerfume });
  } catch (error) {
    console.error("Error adding perfume:", error);
    res.status(500).send({ msg: "Error adding perfume" });
  }
});

app.get("/perfumes", async (req, res) => { 
  try {
    const perfumes = await PerfumeModel.find();
    res.json(perfumes);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching perfumes" });
  }
});

app.put("/perfumes/update/:id", async (req, res) => {
  try {
    const { name, price, description, imageUrl } = req.body; // إضافة imageUrl
    const updateData = { name, price, description, imageUrl }; // تعديل هنا
    const updated = await PerfumeModel.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json({ msg: "Perfume updated", perfume: updated });
  } catch (error) {
    res.status(500).json({ msg: "Error updating perfume" });
  }
});

app.delete("/perfumes/delete/:id", async (req, res) => {
  try {
    await PerfumeModel.findByIdAndDelete(req.params.id);
    res.json({ msg: "Perfume deleted" });
  } catch (error) {
    res.status(500).json({ msg: "Error deleting perfume" });
  }
});
app.post("/api/cart/add", async (req, res) => {
  try {
    const { userId, productId, name, price, imageUrl } = req.body;

    const existingItem = await Cart.findOne({ userId, productId });

    if (existingItem) {
      existingItem.quantity += 1;
      await existingItem.save();
      return res.status(200).json(existingItem);
    }

    const cartItem = await Cart.create({
      userId,
      productId,
      name,
      price,
      imageUrl,
      quantity: 1,
    });

    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get("/api/cart/:userId", async (req, res) => {
  try {
    const items = await Cart.find({ userId: req.params.userId });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.delete("/api/cart/:id", async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ msg: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.use(errorHandler);


app.listen(process.env.PORT,() => {
  console.log(`Server running on port ${process.env.PORT}`);
});

main();