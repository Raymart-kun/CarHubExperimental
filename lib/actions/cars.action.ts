"use server";

import CarModel from "../model/carmodel.model";
import Car from "../model/car.model";
import { connectToDB } from "../mongoose";

export async function getCars() {
  try {
    connectToDB();
    const listofcars = await Car.find().lean();
    return JSON.parse(JSON.stringify(listofcars));
  } catch (error) {}
}
