import CityData from "./cityData";
import "./viewWeatherList.css";
function ViewWeatherList() {
  const counteries = ["Cairo", "Amsterdam", "Paris", "New York", "Berlin"];
  return (
    <div className="list">
      <div className="weather_list">
        {counteries.map((country) => (
          <CityData country={country} />
        ))}
      </div>
    </div>
  );
}

export default ViewWeatherList;
