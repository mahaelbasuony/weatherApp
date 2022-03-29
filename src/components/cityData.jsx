import { useState, useEffect } from "react";
import "./cityData.css";
import Map from "./map";
import {
  BiCloud,
  BiCloudLightRain,
  BiCloudRain,
  BiSun,
  IconName,
} from "react-icons/bi";
import FlagEmoji from "./flagEmoji";
function CityData({ country }) {
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
    <div className="view_data">
      <div className="country_name">
        {weatherData?.name}
        {weatherData.sys?.country && (
          <FlagEmoji countryCode={weatherData.sys?.country} />
        )}
      </div>
      <div className="temp_degree">
        {icon()} <span>{Math.floor(weatherData.main?.temp - 273.15)}°C</span>
      </div>
      <div className="feel_like">
        Feels like {Math.floor(weatherData.main?.feels_like - 273.15)}°C.{" "}
        {weatherData.weather?.[0]?.description}
      </div>
      <div className="temp_details">
        <div className="speed_pressure">
          <span> {weatherData.wind?.speed?.toFixed(1)}m/s S</span>
          <span>
            {weatherData.main?.pressure}
            hPa
          </span>
        </div>
        <div className="humidity_temp">
          <span> Humidity: {weatherData.main?.humidity}% </span>
          <span>
            Dew point:
            {Math.ceil(weatherData.main?.temp_min - 273.15)}°C
          </span>
        </div>
        <div className="visibility">
          {" "}
          <span>
            {" "}
            Visibility:
            {(weatherData.visibility / 1000).toFixed(1)}Km{" "}
          </span>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default CityData;
