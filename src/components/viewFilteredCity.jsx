import {
  BiCloud,
  BiCloudLightRain,
  BiCloudRain,
  BiSun,
  IconName,
} from "react-icons/bi";
import Map from "./map";

import "./viewFilteredCity.css";
import { useState, useEffect } from "react";
import FlagEmoji from "./flagEmoji";

import MapApi from "./MapApi";
function ViewFilteredCity({ country }) {
  const [weatherData, setWeatherData] = useState([]);

  const getData = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=c1f913f2db07513a72e430fd9bfbe2d1`
    )
      // https://tile.openweathermap.org/map/clouds_new/3/35/139?appid=c1f913f2db07513a72e430fd9bfbe2d1
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setWeatherData(data);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const val = weatherData.weather?.[0]?.main;
  const icon = () => {
    switch (val) {
      case "Clouds":
        return <BiCloud />;
      case "Clear":
        return <BiCloudRain />;

      default:
        return <BiSun />;
    }
  };
  const out = weatherData?.cod;
  const dataView = () => {
    if (out) {
      return <div className="alert">Please enter city name</div>;
    }
  };
  return (
    <div className="view_filtered_data">
      <div className="weather_icon">{icon()}</div>
      <div className="country_filtered_data">
        <div className="country_filtered_name_desc">
          <span className="country_filtered_name">
            {weatherData?.name}, {weatherData.sys?.country}
            {weatherData.sys?.country && (
              <FlagEmoji countryCode={weatherData.sys?.country} />
            )}
          </span>
          <span className="country_filtered_desc">
            {" "}
            {weatherData.weather?.[0]?.description}
          </span>
        </div>
        <div className="temp_filtered_degree">
          <span>{Math.floor(weatherData.main?.temp - 273.15)}°C </span>
          <span>
            temperature from {Math.floor(weatherData.main?.temp_min - 273.15)}{" "}
            to {Math.floor(weatherData.main?.temp_max - 273.15)} °C
          </span>
          <span> {weatherData.wind?.speed?.toFixed(1)}m/s ,</span>
          <span>
            {weatherData.main?.pressure}
            hPa
          </span>
          <span> Humidity: {weatherData.main?.humidity}% </span>
        </div>
        <div className="coords_temp_min_max">
          {" "}
          <span className="coords"> Geo coords</span>{" "}
          <span className="temp_min_max">
            [{weatherData.coord?.lon}, {weatherData.coord?.lat} ]
          </span>
        </div>
      </div>

      <div className="map">
        <MapApi
          name={weatherData?.name}
          lon={weatherData.coord?.lon}
          lat={weatherData.coord?.lat}
        />
      </div>
    </div>
  );
}

export default ViewFilteredCity;
