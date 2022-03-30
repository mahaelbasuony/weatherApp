import React, { useRef, useState } from "react";
import CityData from "./cityData";

import "./searchByCountry.css";
import CountriesList from "./CountriesList";
import ViewFilteredCity from "./viewFilteredCity";
function SearchByCountry() {
  const [searchCountry, setSearchCountry] = useState("");
  // const [cities,setcities]= useState('');
  const city = useRef<any | null>(null);
  const handleSearchBy = (e : React.ChangeEvent<any>) => {
    e.preventDefault();
    if (city.current?.value  === "") setSearchCountry("");
    else {
      setSearchCountry(city.current.value);
      city.current.value = "";
    }
  };
  const handleInputVal = () => {
    setSearchCountry("");
  };

  return (
    <div className="view_search">
      <form className="search" onSubmit={handleSearchBy}>
        <input
          className="search_input"
          placeholder="Search City"
          type="search"
          ref={city}
          list="browsers"
          name="browser"
          id="browser"
          autoComplete="false"
          onChange={handleInputVal}
        />
        <button
          className="search_button"
          type="submit"
          // onClick={handleSearchBy}
        >
          Search
        </button>
      </form>

      <div className="filtered_view">
        {searchCountry && city ? (
          <>
            <ViewFilteredCity country={searchCountry} />
          </>
        ) : (
          <div className="alert">Please enter city name</div>
        )}
        <CountriesList country={searchCountry} />
      </div>
    </div>
  );
}

export default SearchByCountry;
