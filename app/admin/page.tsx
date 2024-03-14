import { CarList, CustomFilter, Hero, SearchBar } from "@/components";
import AddCar from "@/components/AddCar";
import React from "react";

const page = () => {
  return (
    <main className="overflow-hidden">
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <h1 className=" font-extrabold text-3xl">Agent Portal</h1>
        <AddCar />
      </div>
    </main>
  );
};

export default page;
