import { CarList, CustomFilter, Hero, SearchBar } from "@/components";
import { fuels, yearsOfProduction } from "@/constants";
import Image from "next/image";

export default function Home({searchParams}:any) {
  return (
    <main className="overflow-hidden">
      <Hero/>
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalouge</h1>
          <p>Export the cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar/>
          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction}/>
          </div>
        </div>
 
        <CarList searchParams={searchParams}/>
      </div>
    </main>
  );
}
