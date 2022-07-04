
import axios from 'axios';
import { useState, useEffect } from 'react';


function ApiWeather() {
  const [data, setData] = useState({})
  const [degree, setDegree] = useState(0);
  const [isDegree, setIsDegree] = useState(true);
  const [urlMyBackground, setMyBackground] = useState("");

  useEffect(() => {
    const success = pos => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=243c3ccf1c64760cee93e51c1beb480a`)
        .then((res) => {
          setData(res.data);
          setDegree((res.data.main.temp_max - 273.15).toFixed(0));
          setMyBackground("https://i.gifer.com/1F1V.gif")
        });
    }
    navigator.geolocation.getCurrentPosition(success);
  }, []);
  console.log(data);

  const convertDegree = () => {
    if (isDegree) {
      setDegree((degree * 9 / 5 + 32).toFixed(0))
      setIsDegree(false)
    } else {
      setDegree(((degree - 32) * 5 / 9).toFixed(0))
      setIsDegree(true)
    }
  }

  console.log("Grados: "+degree);
  
  
  document.body.style.backgroundImage =   `url(${urlMyBackground})`
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundSize = "100%"
  console.log("Degree: " + degree);
  return (
    <div className="container ">
      <div className="card">
        <p className="CityAndCountry">{data.name}, {data.sys?.country} </p>
        <p className="NumberDegree">{degree} {isDegree ? "°C" : "°F"}</p>
        <img className="icon" src={`https://openweathermap.org/img/wn/${data.weather?.[0].icon}@2x.png`} alt="" />
        <button className="btn btn-primary input-group-text" onClick={convertDegree}>Change F°/C°</button>

      <div className="down row mt-3">
        <div className="col">
          <h6>Win Speed:</h6>
          <i class="fa-solid fa-wind"></i>
          <h5 className="temp">{data.wind?.speed} m/s</h5>
        </div>
        <div className="col">
          <h6>Preassure:</h6>
          <i class="fa-solid fa-prescription-bottle"></i>
          <h5 className="temp">{data.main?.pressure} hPa</h5>
        </div>
        <div className="col">
          <h6>Clouds:</h6>
          <i class="fa-solid fa-cloud"></i>
          <h5 className="temp">{data.clouds.all} %</h5>
        </div>
        <div className="col">
          <h6>Humidity:</h6>
          <i class="fa-solid fa-water"></i>
          <h5 className="temp">{data.main?.humidity} %</h5>
        </div>
      </div>
      </div>
    </div>
  )
}

export default ApiWeather;
