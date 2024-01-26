const searchInput = document.getElementById("input");
const searchBtn = document.getElementById("search-btn");
const resultArea = document.querySelector(".search-result");
const background = document.getElementById("background");
const cityDisplay = document.getElementById("city-display");
const temperatureDisplay = document.getElementById("temperature-display");
const windDisplay = document.getElementById("wind-display");
const bgLibrary = [
    {
        id: 0,
        name: "default",
        path: "./img/default_weather.jpg",
    },
    {
        id: 1,
        name: "sun",
        path: "./img/sunny.jpg",
    },
    {
        id: 2,
        name: "clouds",
        path: "./img/cloudy.jpg",
    },
    {
        id: 3,
        name: "rain",
        path: "./img/rainy.jpg",
    },
    {
        id: 4,
        name: "storm",
        path: "./img/thunder.jpg",
    },
    {
        id: 5,
        name: "snowy",
        path: "./img/snowy.jpg",
    },
    {
        id: 6,
        name: "foggy",
        path: "./img/foggy.jpg",
    },
];

let geocodingAPIoutput = [];
let weatherAPIoutput = [];

searchBtn.addEventListener("click", function () {
    const input = searchInput.value;
    geocodingAPIoutput = [];
    const results = document.querySelectorAll(".result");
    results.forEach((result) => {
        result.remove();
    });
    fetchLocation(input);
});

document.addEventListener("keyup", (e) => {
    if (e.key == "Enter") {
        const input = searchInput.value;
        geocodingAPIoutput = [];
        const results = document.querySelectorAll(".result");
        results.forEach((result) => {
            result.remove();
        });
        fetchLocation(input);
    }
});

resultArea.addEventListener("click", function (event) {
    if (event.target.closest(".result") !== null) {
        weatherAPIoutput = [];
        clearDisplays();
        const cityRaw = geocodingAPIoutput[event.target.id].name;
        let cityParsed = cityRaw.split(",");
        const city = cityParsed[0];
        const latitude = geocodingAPIoutput[event.target.id].latitude;
        const longitude = geocodingAPIoutput[event.target.id].longitude;
        resultArea.style.display = "none";
        fetchWeather(latitude, longitude, city);
    }
});

function fetchLocation(input) {
    const geocodingAPI = "https://geocode.maps.co/search?q=" + input + "&api_key=65b239429b81e291829382vmh8188bb";
    fetch(geocodingAPI)
        .then((response) => response.json())
        .then((data) => {
            data.forEach((element) => {
                geocodingAPIoutput.push({
                    name: element.display_name,
                    latitude: element.lat,
                    longitude: element.lon,
                });
            });
        })
        .then(() => {
            let i = 0;
            geocodingAPIoutput.forEach((element) => {
                const displayResult = document.createElement("div");
                displayResult.classList.add("result");
                displayResult.setAttribute("id", i);
                displayResult.innerText = element.name;
                resultArea.appendChild(displayResult);
                i++;
            });
            resultArea.style.display = "flex";
        });
}

function fetchWeather(latitude, longitude, city) {
    const weatherAPI =
        "https://api.open-meteo.com/v1/meteofrance?latitude=" +
        latitude +
        "&longitude=" +
        longitude +
        "&current=temperature_2m,weather_code,wind_speed_10m";
    fetch(weatherAPI)
        .then((response) => response.json())
        .then((data) => {
            weatherAPIoutput = {
                temperature: data.current.temperature_2m,
                weather: data.current.weather_code,
                wind: data.current.wind_speed_10m,
            };
            console.log(weatherAPIoutput); // api com checker
        })
        .then(() => {
            backgroundSelector(weatherAPIoutput.weather);
            displayData(city, weatherAPIoutput.temperature, weatherAPIoutput.wind);
        });
}

function backgroundSelector(weather) {
    switch (true) {
        case weather >= 0 && weather <= 19:
            background.src = bgLibrary[1].path; // sunny
            break;
        case weather >= 20 && weather <= 28:
            background.src = bgLibrary[2].path; // cloudy
            break;
        case weather >= 29 && weather <= 35:
            background.src = bgLibrary[4].path; // storm
            break;
        case weather >= 36 && weather <= 39:
            background.src = bgLibrary[5].path; // snowy
            break;
        case weather >= 40 && weather <= 49:
            background.src = bgLibrary[6].path; // foggy
            break;
        case weather >= 50 && weather <= 99:
            background.src = bgLibrary[3].path; // raining
            break;
        default:
            background.src = bgLibrary[0].path;
            console.log("weather unavailable");
    }
}

function clearDisplays() {
    const rCity = document.getElementById("city");
    rCity ? rCity.remove() : "";

    const rTemperature = document.getElementById("temperature");
    rTemperature ? rTemperature.remove() : "";

    const rWind = document.getElementById("wind");
    rWind ? rWind.remove() : "";
}

function displayData(city, temperature, wind) {
    const pCity = document.createElement("p");
    pCity.setAttribute("id", "city");
    pCity.innerText = city;
    cityDisplay.appendChild(pCity);

    const pTemperature = document.createElement("p");
    pTemperature.setAttribute("id", "temperature");
    pTemperature.innerText = "Temperature : " + temperature + "°";
    temperatureDisplay.appendChild(pTemperature);

    const pWind = document.createElement("p");
    pWind.setAttribute("id", "wind");
    pWind.innerText = "Wind speed : " + wind + " km/h";
    windDisplay.appendChild(pWind);
}
