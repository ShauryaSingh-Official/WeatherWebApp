var unit = "metric";
let getunit = document.getElementById("unit");
let unitsymbol = document.getElementsByClassName("unitsymbol");

let getWeatherBtn = document.getElementById("getWeather");
let inputProvided = document.getElementById("locationSearched");

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

// #################################################### Implement Unit Selection  ####################################################
getunit.addEventListener('change',(e)=>{
  if (e.target.value !== "metric"){ 
    unit="imperial"  ;
    unitsymbol[0].innerText = "Fah";
    unitsymbol[1].innerText = "Fah";
  }
  else {
    unit="metric";
    unitsymbol[0].innerText = "°C"
    unitsymbol[1].innerText = "°C"
  }
  // Call the API to fetch new/modified data 
  updateWeatherData()
})



// ####################################################    GENERATE LINK For API   ####################################################

function getURL(){
  let base = "https://api.openweathermap.org/data/2.5/weather?";
  let zIPOrCityName;
  let endPath;

  // https://api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
  // https://api.openweathermap.org/data/2.5/weather?zip=202001,IN&appid=657cdd6c56a859874d12b8cae9f10ecf&units=metric
  if(+inputProvided.value >=1 ){
    zIPOrCityName = "zip=";
    endPath = ",in&appid=657cdd6c56a859874d12b8cae9f10ecf&units="+`${unit}`;
    console.log(base+zIPOrCityName+inputProvided.value+endPath);
  }
  else {
    zIPOrCityName= "q=";
    endPath = "&appid=657cdd6c56a859874d12b8cae9f10ecf&units="+`${unit}`;
  }
  return ( base+zIPOrCityName+inputProvided.value+endPath) ;
}

// ####################################################  GET WEATHER  ####################################################

const updateWeatherData = async ()=>{
  let URL;
  let resp;

  // GENERATE URL
  if(inputProvided.value){   URL = getURL(); }
  else {alert("Invalid Data Provided !!!\n Please provide valid City name or ZIP Code. ")
return;}
  
  // MAKE ASYNCHRONOUS API REQUEST
  try{
    if(inputProvided){resp = await fetch(URL);}
  
    //  GET/EXTRACT DATA FROM RESPONSE
    if (!resp.ok) {
      throw new Error("Error: ${resp.status}");
    } else {
      data = await resp.json();
      setValues(data);
}
  }
  catch(error){
    console.log("LOCATION NOT FOUND !!! \n Please provide valid an indian ZIPCode. OR \n Check your internet connection.");
    alert("LOCATION NOT FOUND !!! \n Please provide valid an indian ZIPCode. OR \n Check your internet connection.");
  }
  
}

getWeatherBtn.addEventListener("click", updateWeatherData)


// SET VALUES IN FRONTEND

  function setValues(data){
    temperature.innerHTML = data.main.temp; 
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
