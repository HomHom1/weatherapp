import axios from 'axios';
import React, { useState } from 'react'
import {FaSearchLocation} from 'react-icons/fa';
import './homepage.css'
import maxtemp from '../../Assets/maxtemp.png'
import mintemp from '../../Assets/mintemp.png'
import feelslike from '../../Assets/feelslike.png'
import sunny from '../../Assets/sun.png'
import snow from '../../Assets/snow.png'
import thunder from '../../Assets/thunder.png'
import cloud from '../../Assets/cloud.png'
import cloudy from '../../Assets/cloudsun.png'
import rain from '../../Assets/rain.png'
import waiting from '../../Assets/smiles.png'

function Homepage() {


  const [place, setPlace] = useState()
  const [placeInfo, setPlaceInfo] = useState();
  

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=f2ec7956667dfed47136d88606db9b0a`;



  const getHandle = () => {
    axios.get(url)
    .then((response) => setPlaceInfo({
      name: response.data.name,
      country:response.data.sys.country,
      weather: {
        current: response.data.main.temp,
        max: response.data.main.temp_max,
        min: response.data.main.temp_min,
        feel: response.data.main.feels_like
      },
      condition: response.data.weather[0].main
    })
  );
};


const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=f2ec7956667dfed47136d88606db9b0a`)
      .then((response) => setPlaceInfo({
        name: response.data.name,
        country: response.data.sys.country,
        weather: {
          current: response.data.main.temp,
          max: response.data.main.temp_max,
          min: response.data.main.temp_min,
          feel: response.data.main.feels_like
        },
        condition: response.data.weather[0].main
      }))
    });

  }
}





  const getSetHandle = (city) => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f2ec7956667dfed47136d88606db9b0a`)
    .then((response) => setPlaceInfo({
      name: response.data.name,
      country: response.data.sys.country,
      weather: {
        current: response.data.main.temp,
        max: response.data.main.temp_max,
        min: response.data.main.temp_min,
        feel: response.data.main.feels_like
      },
      condition: response.data.weather[0].main
    })
  );
};
  return (
    <section id='homepage' className='homepage'>
      <div className="search-container">
        <div className='homepage-container'>
          <div className='search'>
            <input className='search-bar' type='Text' placeholder='search city...' onChange={(e) => setPlace(e.target.value)}/>
            <button className='submit-button' type='submit' value='submit' onClick={getHandle}><a href='#weather'><FaSearchLocation size={30}/></a></button>
          </div>
          <div className="example-cities">
            <h4>Example Cities: </h4>
            <button className='example-city' onClick={() => {
              getSetHandle('London')
            }}><h4>London</h4></button>
            <button className='example-city' onClick={() => {
              getSetHandle('New York')
            }}><h4>New York</h4></button>
            <button className='example-city' onClick={() => {
              getLocation()
            }}><h4>Locate me!</h4></button>
          </div>
        </div>
      </div>
      <div className="weather-content">
        <div className="name-weather">
          <h1>{Math.round((placeInfo?.weather.current - 273.15) * 9/5 + 32)}˚ F  <img src=
          {
            placeInfo?.condition.toLowerCase().includes('clear')? sunny : 
            placeInfo?.condition.toLowerCase().includes('clouds') ? cloud : 
            placeInfo?.condition.toLowerCase().includes('rain')? rain : 
            placeInfo?.condition.toLowerCase().includes('mist')? rain : 
            placeInfo?.condition.toLowerCase().includes('snow')? snow: 
            placeInfo?.condition.toLowerCase().includes('thunderstorm')? thunder : 
            placeInfo?.condition.toLowerCase().includes('scattered clouds') ? cloudy : 
            placeInfo?.condition.toLowerCase().includes('haze')? cloudy:
            waiting
          } alt='condition'width='50'
          /></h1>
  
          <h3>{placeInfo?.condition}</h3>
          <h3>{placeInfo?.name}, {placeInfo?.country} </h3>
        </div>
      </div>


      <div className="weather">          
        <div className="extra-info">
          <h3> 
            <img src={maxtemp} alt='' width='25'/>
              
              Max: {Math.round((placeInfo?.weather.max - 273.15) * (9/5) + 32 )}˚ F
          </h3>

          <h3>
            <img src={mintemp} alt='' width='25'/>
            
            Min: {Math.round((placeInfo?.weather.min - 273.15) *(9/5) +32 )}˚ F

          </h3>
          
          <h3>
            <img src={feelslike} alt='' width='25'/>
            
            Feel-like: {Math.round((placeInfo?.weather.feel - 273.15) * (9/5) +32)}˚ F
            
          </h3>
        </div>
      </div>
    </section>  
    )
}

export default Homepage