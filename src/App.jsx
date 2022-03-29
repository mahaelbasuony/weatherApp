import "./App.css";
import CityData from "./components/cityData";
import SearchByCountry from "./components/searchByCountry";
import ViewWeatherList from "./components/viewWeatherList";

function App() {
  return (
    <div className="App">
      <div className="title">Weather in your city</div>
      <ViewWeatherList />
      <SearchByCountry />
    </div>
  );
}

export default App;
