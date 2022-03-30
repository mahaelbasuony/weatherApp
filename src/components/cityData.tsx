import { FC, useState, useEffect } from "react";
import "./cityData.css";
import { BiCloud, BiCloudRain, BiSun } from "react-icons/bi";
import FlagEmoji from "./flagEmoji";

type Props = {
  country: string;
};

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

const CityData: FC<Props> = ({ country }) => {
  const [weatherData, setWeatherData] = useState<WeatherObject | null>(null);

  const getData = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=c1f913f2db07513a72e430fd9bfbe2d1`
    )
      // https://tile.openweathermap.org/map/clouds_new/3/35/139?appid=c1f913f2db07513a72e430fd9bfbe2d1
      .then((res) => res.json())
      .then((data) => {
        console.log({ data });

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
    <div className="view_data">
      <div className="country_name">
        {weatherData?.name}
        {weatherData?.sys?.country && (
          <FlagEmoji countryCode={weatherData?.sys?.country} />
        )}
      </div>
      <div className="temp_degree">
        {icon()}{" "}
        <span>{Math.floor((weatherData?.main?.temp || 0) - 273.15)}°C</span>
      </div>
      <div className="feel_like">
        Feels like {Math.floor((weatherData?.main?.feels_like || 0) - 273.15)}
        °C. {weatherData?.weather?.[0]?.description}
      </div>
      <div className="temp_details">
        <div className="speed_pressure">
          <span> {weatherData?.wind?.speed?.toFixed(1)}m/s S</span>
          <span>
            {weatherData?.main?.pressure}
            hPa
          </span>
        </div>
        <div className="humidity_temp">
          <span> Humidity: {weatherData?.main?.humidity}% </span>
          <span>
            Dew point:
            {Math.ceil((weatherData?.main?.temp_min || 0) - 273.15)}°C
          </span>
        </div>
        <div className="visibility">
          {" "}
          <span>
            {" "}
            Visibility:
            {((weatherData?.visibility || 0) / 1000).toFixed(1)}Km{" "}
          </span>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default CityData;
