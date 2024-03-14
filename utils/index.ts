import { CarProps, FilterProps } from "@/types";

const rapidUrl = "https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "e943c84b7amsha3e58ec7051e10ap1571cbjsn576aba6f02cd",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  },
};

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, model, limit, fuel } = filters;
  const response = await fetch(
    `${rapidUrl}make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,
    options
  );

  const result = await response.json();
  return result;
}

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

// export const generateCarImageUrl = (car: CarProps, angle?: string) => {
//   const apiKey = 'daefd14b-9f2b-4968-9e4d-9d4bb4af01d1'
//   const url = new URL('https://cdn.imagin.studio/getimage')

//   const { make, year, model } = car;

//   url.searchParams.append('customer', 'rgomez@topjuan-tech.com')
//   url.searchParams.append('modelFamily', model.split(' ')[0])
//   url.searchParams.append('zoomType', 'fullscreen')
//   url.searchParams.append('modelYear', `${year}`)
//   url.searchParams.append('angle', `${angle}`)

//   return `${url}`;
// }

// export const updateSearchParams = (type: string, value: string) => {
//   const searchParams = new URLSearchParams(window.location.search)

//   searchParams.set(type, value)

//   const newPathname = `${window.location.pathname}?${searchParams.toString()}`

//   return newPathname
// }
