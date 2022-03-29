import { useEffect } from "react";
import countriesData from "../data.json";
import "./CountriesList.css";
function CountriesList({ country }) {
  let count = 0;
  return (
    <datalist className="cities_datalist" id="browsers">
      {countriesData &&
        country &&
        countriesData.map((city) => {
          const c = city.name.toLowerCase();
          if (c.match(country.toLowerCase()) && count < 5) {
            count++;

            return <option key={city.id}>{city.name}</option>;
          }
        })}
    </datalist>
  );
}

export default CountriesList;
