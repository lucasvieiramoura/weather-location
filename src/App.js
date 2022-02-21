import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);

  let getWeather = async (lat,long)=>{
    let res = await axios.get("http://api.openweathermap.org/data/2.5/weather",{
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WHEATHER_KEY,
        lang:'pt',
        units: 'metric'
      }
    });
    setWeather(res.data);
    console.log(res.data);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
     getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true);
    })
  }, [])// Sempre que recarrega a tela chama o Effect de novo, passando o Array vazio no final ele chama uma única vez

  if (location == false) { 
    return (
      <Fragment>
        Você precisa habilitar a localização no browser o/
      </Fragment>
    )

  }else if (weather == false) { //Como o processo para pegar os dados no endpoint da API é async quando não houver dados ainda exibe esta mensagem
    return <Fragment>
      Carregando o clima...
    </Fragment>
  
  } else { // quando o endpoint da API retona as informações para o objeto weather carrega o Fragment abaixo
    return (
      <Fragment>
        <h3>Clima nas duas Coordenadas ({weather['weather'][0]['description']}) 
          <span><a  className={weather['weather'][0]['icon']}></a></span> 
        </h3>
        <hr />
        <ul>
          <li>Temperatura atual:{weather['main']['temp']}</li>
          <li>Temperatura máxima: {weather['main']['temp_max']}</li>
          <li>Temperatura minima: {weather['main']['temp_min']}</li>
          <li>Pressão: {weather['main']['pressure']} hpa</li>
          <li>Umidade: {weather['main']['humidity']}</li>
        </ul>
      </Fragment>
    );
  }
}

export default App;
