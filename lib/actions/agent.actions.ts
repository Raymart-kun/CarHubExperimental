"use server";

import { connectToDB } from "../mongoose";
import CarModel from "../model/carmodel.model";
import Car from "../model/car.model";
import { revalidatePath } from "next/cache";

export async function getCarModels() {
  try {
    connectToDB();
    const listofcategory = await CarModel.find().lean();
    return JSON.parse(JSON.stringify(listofcategory));
  } catch (error) {}
}

export async function addCar({
  name,
  description,
  carModelId,
  carModel,
  price,
  carImage,
  options,
  path,
}: {
  name: string;
  description: string;
  carModelId: string;
  carModel: string;
  price: number;
  carImage: string;
  options: any;
  path: string;
}) {
  try {
    connectToDB();

    if (carModelId === "") {
      const newCarModel = await CarModel.create({ carModelName: carModel });
    }

    const getCarModelId = await CarModel.findOne(
      { carModel: carModel },
      { _id: 1, categoryName: 1 }
    );

    const newCar = await Car.create({
      carName: name,
      carImage: carImage,
      description: description,
      carModel: getCarModelId._id,
      price: price,
    });

    await CarModel.findByIdAndUpdate(getCarModelId._id, {
      $push: { cars: newCar._id },
    });

    console.log("Car Added Succesfully");
    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Error adding Product: ${error.message}`);
  }
}
