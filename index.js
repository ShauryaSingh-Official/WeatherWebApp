let data;
let locObj; // store user geolocation (fetched automatically)
let cityNameProvided = document.getElementById("locationSearched");

let cityName = document.getElementById("city");
let weather = document.getElementById("weatherType");
let temperature = document.getElementById("temperature");
let humidity = document.getElementById("humidity");
let pressure = document.getElementById("pressure");
let wind = document.getElementById("wind");
let description = document.getElementById("description");
let visibility = document.getElementById("visibility");
let lattitude = document.getElementById("lattitude");
let longititude = document.getElementById("longititude");
let feelsLike = document.getElementById("feelsLike");
let country = document.getElementById("country");


//   ####################################################################################################################
var resp;
const getWeather = async () => {
    
     let url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityNameProvided.value + "&appid=657cdd6c56a859874d12b8cae9f10ecf&units=metric";
      resp = await fetch(url);
  
      if (!resp.ok) {
          alert(resp.status);
          throw new Error("Error: ${resp.status}");
        } else {
          data = await resp.json();
          setValues(data);
    }
  };
  
  const setValues = (data) => {
    temperature.innerHTML = data.main.temp; // degree celcius / fahrenhiet
    humidity.innerHTML = data.main.humidity;
    pressure.innerHTML = data.main.pressure;
    wind.innerHTML = data.wind.speed; // km/hr
    description.innerHTML = data.weather[0].description;
    visibility.innerHTML = data.visibility;
    lattitude.innerHTML = data.coord.lat;
    longititude.innerHTML = data.coord.lon;
    feelsLike.innerHTML = data.main.feels_like;
    country.innerHTML = data.sys.country;
    weather.innerHTML = data.weather[0].main;
    cityName.innerHTML = data.name;
  };

// #######################################################################################################################
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}

function showPosition(position) {
  locObj = {
    "latitude": (position.coords.latitude).toString(),
    "longitude": (position.coords.longitude).toString()
  };
  console.log(locObj);
  console.log(locObj.latitude+" , "+locObj.longitude)
  let url2 = "https://api.openweathermap.org/data/2.5/weather?lat="+locObj.latitude+"&lon="+locObj.longitude+"&appid=657cdd6c56a859874d12b8cae9f10ecf&units=metric";
    (async () => {
         resp = await fetch(url2);    
         if (!resp.ok) {
             alert(resp.status);
             throw new Error("Error: ${resp.status}");
           } else {
             data = await resp.json();
             setValues(data);
       }
     })();
}
getLocation();


// console.log();
// ####################################################################Event listener
const getWeatherBtn = document.getElementById("getWeather");
getWeatherBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!cityNameProvided) {
    alert("Please provide city or zip code");
  } else {
    getWeather();
  }
});

// error handle ()
// type conversion btn
// font change
// ask location and pin code search
