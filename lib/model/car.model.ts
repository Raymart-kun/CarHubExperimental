import mongoose from "mongoose";

const CarSchema = new mongoose.Schema({
  carName: { type: String, required: true, unique: true },
  carImage: String,
  price: Number,
  description: { type: String, required: true },
  carModel: { type: mongoose.Schema.Types.ObjectId, ref: "CarModel" },
  createdAt: { type: Date, default: Date.now },
});

const Car = mongoose.models.Car || mongoose.model("Car", CarSchema);

export default Car;
