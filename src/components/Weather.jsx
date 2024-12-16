import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/Assets/search.png'
import clear from '../assets/Assets/clear.png'
import cloud from '../assets/Assets/cloud.png'
import drizzle from '../assets/Assets/drizzle.png'
import humidity from '../assets/Assets/humidity.png'
import rain from '../assets/Assets/rain.png'
import snow from '../assets/Assets/snow.png'
import wind from '../assets/Assets/wind.png'

const  Weather = ()=> {
    const [weatherData,setweatherData] = useState(false);
    const  inputRef = useRef()
    const allIcons ={
        "01d" : clear,
        "01n" : clear,
        "02d" : cloud,
        "02n" : cloud,
        "03d" : cloud,
        "03n" : cloud,
        "04d" : drizzle,
        "04n" : drizzle,
        "09d" : rain,
        "09n" : rain,
        "10d" : rain,
        "10n" : rain,
        "13d" : snow,
        "13n" : snow,


    }

    const search =async(city)=>{

        if(city === ""){
            alert("Enter City Name!");
            return;
        }
        try {

            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`;

            const response = await fetch(url);
            const data = await response.json()
            console.log(data)
            const icon = allIcons[data.weather[0].icon] || clear; 
            setweatherData({
                humidity:data.main.humidity,
                windSpeed:data.wind.speed,
                temperature:Math.floor(data.main.temp),
                location:data.name,
                icon:icon

            })
            
        } catch (error) {
            setweatherData(false)
            console.error('error in fetching data')
            
        }

    }
    useEffect(()=>{
      search("london")
    },
    [])



  return (
    <>
    <div className='weather'>
      <div className="search-bar">
        <input ref={inputRef}  type="text" placeholder='search'/>
        <img src={search_icon} alt="search icon" onClick={()=>search(inputRef.current.value)}/> 
        </div>  
        {weatherData?<>
            <img src={weatherData.icon} alt="clear weather" className='weather-icon' />
           <p className='temparature'>{weatherData.temperature}&deg;C</p>
           <p className='location'>{weatherData.location}</p>
           <div className='weather-data'>
             <div className="col">
                <img src={humidity} alt="humidity icon" />
                <div>
                    <p>{weatherData.humidity}%</p>
                    <span>humidity</span>
                </div>
             </div>
             <div className="col">
                <img src={wind} alt="wind icon" />
                <div>
                    <p>{weatherData.windSpeed} km/h</p>
                    <span>Wind Speed</span>
                </div>
             </div>
           </div>
        </>:<>
         ooopss! Looks like you missed something, enter the city again</>}
           
    </div>
    </>
   
  )
}

export default Weather