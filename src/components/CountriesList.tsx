import { FC } from "react";
import { useEffect } from "react";
import countriesData from "../data.json";
import "./CountriesList.css";
type Props = {
  country: string;
};
type DataObject = {
  id: number;
  name: string;
  state: string;
  country: string;
  coord: {
    lon: number;
    lat: number;
  };
};
const CountriesList: FC<Props> = ({ country }) => {
  let count = 0;
  console.log(countriesData);
  return (
    <datalist className="cities_datalist" id="browsers">
      {country &&
        (countriesData as DataObject[]).map((city) => {
          const c = city.name.toLowerCase();
          if (c.match(country.toLowerCase()) && count < 5) {
            count++;

            return <option key={city.id}>{city.name}</option>;
          }
        })}
    </datalist>
  );
};

export default CountriesList;
