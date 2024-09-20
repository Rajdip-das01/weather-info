console.log("working..");

const apikey = "d50fb68c64feb3e7713d1924060c7e8d";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weathericn = document.querySelector(".weather-icon");

async function checkweather(city) {
    const respose = await fetch(apiurl + city + `&appid=${apikey}`);

    if (respose.status == 404) {
        document.querySelector(".error").style.display = "block"
        document.querySelector(".weather").style.display = "none"
    }
    else {
        var data = await respose.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "&deg;c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";

        if (data.weather[0].main == "Clear") {
            weathericn.src = "img/clear.png"
        }
        else if (data.weather[0].main == "Clouds") {
            weathericn.src = "img/clouds.png"
        }
        else if (data.weather[0].main == "Drizzle") {
            weathericn.src = "img/drizzle.png"
        }
        else if (data.weather[0].main == "Mist") {
            weathericn.src = "img/mist.png"
        }
        else if (data.weather[0].main == "Rain") {
            weathericn.src = "img/rain.png"
        }
        else if (data.weather[0].main == "Snow") {
            weathericn.src = "img/snow.png"
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
        console.log(data)
    }



}

searchbtn.addEventListener("click", () => {
    checkweather(searchbox.value);
})

searchbox.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        checkweather(searchbox.value);
    }
});