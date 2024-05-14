import axios from "axios";
import { useState } from "react";

function App() {
  const [data, setData] = useState("");
  const [location, setLocation] = useState("");
  const [celsius, setCelsius] = useState(false);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=09c910be63a2b6a5e2074740f9a93e90`;

 
  function kelvinToCelsius(kelvin) {
    return Math.floor(kelvin - 273.15);
  }

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
    }
  };
  return (
    <>
      <div className="app">
        <div className="search">
          <input 
          type="text" 
          value={location}
          onChange={(e)=>setLocation(e.target.value)}
          onKeyDown={searchLocation}
          placeholder="Enter Location" />
          <button className="celsius" onClick={() => setCelsius(!celsius)}>
            {!celsius ? "K" : "C°"}
          </button>
        </div>
        <div className="container">
          <div className="top">
            <div className="location">
              <p>{data.name}</p>
            </div>
            <div className="temp">
              {data.main ? celsius ? <h1>{kelvinToCelsius(data.main.temp)} C°</h1> : <h1>{data.main.temp} K</h1> : null}
            </div>
            <div className="description">
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
          </div>
          {data && 
          <div className="bottom">
          <div className="feels">
            {data.main ? celsius ? <p>{kelvinToCelsius(data.main.feels_like)} C°</p> : <p>{data.main.feels_like} K</p> : null}
            <span>Feels Like</span>
          </div>
          <div className="humidity">
           {data.main ? <p>{data.main.humidity}%</p> : null} 
            <span>Humidity</span>
          </div>
          <div className="wind">
            {data.wind ? <p>{data.wind.speed} MPH</p> : null}
            <span>Wind Speed</span>
          </div>
        </div>}
          
        </div>
      </div>
    </>
  );
}

export default App;
