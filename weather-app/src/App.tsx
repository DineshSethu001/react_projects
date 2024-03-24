import React, { useEffect, useState } from 'react';
import './App.css';
import searchIcon from './assets/icons8-search-64.png'
import clearIcon from './assets/clearIcon.png'
import humidityIcon from './assets/humidity.png'
import windIcon from './assets/wind.png'
import rainIcon from './assets/rain.png'
import snowIcon from './assets/snow.png'
import cloudIcon from './assets/cloud.png'
import drizzleIcon from './assets/drizzle.png'
import PropTypes from 'prop-types';

const WeatherDetails = ({icon, temp, text, city, wind, humidity, long, lat, country}) => {
  return( 
  <div className="weather-container">
    <div className="image">
      <img src={icon} className="clearIcon" alt="images"/>
    </div>
    <div className="temp">{temp}C</div> 
    <div className="location">{city}</div>
    <div className="country">{country}</div>
    <div className="cord">
      <div>
        <span className = "lat">Latitude</span>
        <span>{lat}</span>
      </div>
      <div>
        <span className = "long">Longtitude</span>
        <span>{long}</span>
      </div>
   

    </div>

<div className="data-container">
<div className="element">
  <img src={humidityIcon} alt="" className='icon'/>
  <div className="data">
    <div className="humidity-percent">
      {humidity}%
    </div>
    <div className="text">Humidity</div>
  </div>
  </div>
  <div className="element">
  <img src={windIcon} alt="" className='icon'/>
  <div className="data">
    <div className="wind-percent">
      {wind}km
    </div>
    <div className="text">wind-speed</div>
  </div>
  </div>
    
</div>
  </div>
  )
}
WeatherDetails.prototype = {
    icon:PropTypes.string.isRequired,
    temp:PropTypes.number.isRequired,
    city:PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    humidity:PropTypes.number.isRequired,
    wind:PropTypes.number.isRequired,
    lat:PropTypes.number.isRequired,
    log:PropTypes.number.isRequired

}
//main function 
export default function App() {

  let api_key="27f5679fa319bc323e3ba7c716218fa9"
  const [icon, setIcon] = useState(clearIcon);
  const [temp, setTemp]=useState(5)
  const [text, setText] = useState("Vellore");
  const [wind, setWind] = useState(0)
  const [humidity, setHumidity]=useState(76)
  const [long,setLong] = useState(33)
  const [lat, setLat] = useState(43)
  const [country, setCountry] = useState("india")
  const [city,setCity] = useState("")
  const [cityNotFound, setcityNotFound]=useState(false)
  const [loading, setLoading] = useState(false);
  const [error,setError] =useState(null);

  const weatherIconMap = {
    "01d":clearIcon,
    "01n":clearIcon,
    "02d":cloudIcon,
    "02n":cloudIcon,
    "03d":drizzleIcon,
    "03n":drizzleIcon,
    "04d":drizzleIcon,
    "04n":drizzleIcon,
    "09d":rainIcon,
    "09n":rainIcon,
    "10d":rainIcon,
    "10n":rainIcon,
    "13d":snowIcon,
    "13n":snowIcon
  }
const search = async () =>{

    setLoading(true)
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;
    
    try{
      const res = await fetch(url)
      const data = await res.json()
      if(data.cod === "404"){
        console.error("City not found")
        setcityNotFound(true);
        setLoading(false);
        return;
      }
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLong(data.coord.lon);
      const weatherIconCode = data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] || clearIcon)
      setcityNotFound(false)

    }catch(error){
      console.error("An error occurred:", error.message)

      setError("An error occurred while fetching weather")
      alert("enter the correct city name")
    }
    finally{
      setLoading(false);
    }
  };
  const handleCity = (e) => {
    
    setText(e.target.value)
  }
  const handleKeyDown = (e) =>{
    if(e.key === "Enter"){
        search();
    }
  }
  useEffect(function (){
    search();
  },[]);
  return (
    <div className="app-container">
            <div className="input-container">
                    <input className="cityInput" 
                    placeholder='search city' 
                    onChange={handleCity}
                    value={text}
                    onKeyDown={handleKeyDown}/>
              <div className="search-icon" onClick={() => search()}>
                <img src={searchIcon} alt="search" />
              </div>
            </div>
       
            {loading && <div className="loading-message">
              Loading...
            </div>}

            {error && <div className="error-message">
             {error} 
            </div>}
            {cityNotFound && <div className="city-not-found">City not found</div>}
            {!loading && !cityNotFound && <WeatherDetails icon={icon} temp = {temp} text = {text} city = {city} 
                            wind = {wind} humidity = {humidity} long = {long} lat = {lat} 
                            country={country} />}
            <p className='copyright'>  
                  Designed by <span>Dinesh T</span>
            </p>
    </div>
  )
}
