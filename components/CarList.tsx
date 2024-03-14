import { fetchCars } from "@/utils";
import { CarCard, ShowMore } from ".";
import { getCars } from "@/lib/actions/cars.action";

async function CarList({ searchParams }: any) {
  // const allCars = await fetchCars({
  //   manufacturer: searchParams.manufacturer || '',
  //   year: searchParams.year || 2022,
  //   fuel: searchParams.fuel || '',
  //   limit: searchParams.limit || 10,
  //   model: searchParams.model || '',
  // })

  const allCars = await getCars();
  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  console.log(allCars);
  return (
    <>
      {!isDataEmpty ? (
        <section>
          <div className="home__cars-wrapper">
            {allCars?.map((car, index) => (
              <CarCard car={car} key={index} />
            ))}
          </div>

          {/* <ShowMore
          pageNumber={(searchParams.limit || 10)/10}
          isNext={(searchParams.limit || 10) > allCars.length}
        /> */}
        </section>
      ) : (
        <div className="home__error-container">
          <h2 className="text-black text-xl font-bold">Oops, no results</h2>
          <p>{allCars?.message}</p>
        </div>
      )}
    </>
  );
}

export default CarList;
