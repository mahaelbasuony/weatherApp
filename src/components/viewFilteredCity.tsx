import {
  BiCloud,
  BiCloudLightRain,
  BiCloudRain,
  BiSun,
 
} from "react-icons/bi";


import "./viewFilteredCity.css";
import { useState, useEffect } from "react";
import FlagEmoji from "./flagEmoji";

import MapApi from "./MapApi";
import { FC } from "react";
type Props={
  country: string
}

type WeatherObject = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};
type MapApiObject={
  name: string,
  lon: number,
  lat: number
}
const ViewFilteredCity:FC<Props>=({ country }) =>{
  const [weatherData, setWeatherData] = useState<WeatherObject | null>(null);

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

  const val = weatherData?.weather?.[0]?.main;
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
            {weatherData?.name}, {weatherData?.sys?.country}
            {weatherData?.sys?.country && (
              <FlagEmoji countryCode={weatherData.sys?.country} />
            )}
          </span>
          <span className="country_filtered_desc">
            {" "}
            {weatherData?.weather?.[0]?.description}
          </span>
        </div>
        <div className="temp_filtered_degree">
          <span>{Math.floor((weatherData?.main?.temp  ) || 0 - 273.15)}°C </span>
          <span>
            temperature from {Math.floor((weatherData?.main?.temp_min ) || 0- 273.15)}{" "}
            to {Math.floor((weatherData?.main?.temp_max ) || 0- 273.15)} °C
          </span>
          <span> {(weatherData?.wind?.speed?.toFixed(1)) || 0}m/s ,</span>
          <span>
            {weatherData?.main?.pressure}
            hPa
          </span>
          <span> Humidity: {weatherData?.main?.humidity}% </span>
        </div>
        <div className="coords_temp_min_max">
          {" "}
          <span className="coords"> Geo coords</span>{" "}
          <span className="temp_min_max">
            [{weatherData?.coord?.lon}, {weatherData?.coord?.lat} ]
          </span>
        </div>
      </div>

      <div className="map">
        <MapApi 
          name={weatherData?.name || ''}
          lon={weatherData?.coord?.lon || 0}
          lat={weatherData?.coord?.lat || 0}
        />
      </div>
    </div>
  );
}

export default ViewFilteredCity;
