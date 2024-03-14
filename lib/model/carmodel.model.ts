import mongoose from "mongoose";

const CarModelSchema = new mongoose.Schema({
  carModelName: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  cars: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
    },
  ],
});

const CarModel =
  mongoose.models.CarModel || mongoose.model("CarModel", CarModelSchema);

export default CarModel;
