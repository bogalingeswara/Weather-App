let wrapper = document.querySelector('.wrapper'),
        inputPart = wrapper.querySelector('.input-part'),
        infoTxt = inputPart.querySelector('.info-txt'),
        inputField = inputPart.querySelector('input'),
        locationbtn = inputPart.querySelector('button'),
        wIcon = document.querySelector(".weather-part img"),
        arrowBack = wrapper.querySelector("header i");

const apiKey = "42c52294f94b204ba3421f10db3ea482"; // API key
let api;

inputField.addEventListener('keyup', e => {
        if (e.key == "Enter" && inputField.value != "") {
                requestApi(inputField.value); // calls requestApi function below 
        }
})

locationbtn.addEventListener('click', () => {
        if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(onSuccess, onError)  // gets the current loaction for the device 
        } else {
                alert('your Browser not supports geolocation API')
        }
})

function onSuccess(position) {
        const { latitude, longitude } = position.coords;
        api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
        fetchData();    // calls the fetchData function below
}

function onError(error) {
        infoTxt.innerText = error.message;    // renders error message 
        infoTxt.classList.add("error");
}

function requestApi(city) {
        api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`; // API link
        fetchData();    // calls the fetchData function below 
}

function fetchData() {
        infoTxt.innerText = "Getting Weather Details....";
        infoTxt.classList.add("pending");
        // getting API response and
        // returning it with parsing into JS Object
        // in another then function calling 'weatherDetails' function
        // with passing API result as an argument.
        fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}


function weatherDetails(result) {
        if (result.cod === "404") {
                infoTxt.innerText = `${inputField.value} isn't exist!`;
                infoTxt.classList.replace("pending", "error");
        } else {
                // destructuring the object in the console //
                const city = result.name;
                const country = result.sys.country;
                const { description, id } = result.weather[0];
                const { feels_like, humidity, temp } = result.main;


                // changing the weather icons
                if (id == 800) {
                        wIcon.src = "weather-app-icons/Weather_icons/clear.svg"
                } else if (id >= 200 && id <= 232) {
                        wIcon.src = "weather-app-icons/Weather_icons/strom.svg"
                } else if (id >= 600 && id <= 622) {
                        wIcon.src = "weather-app-icons/Weather_icons/snow.svg"
                } else if (id >= 701 && id <= 781) {
                        wIcon.src = "weather-app-icons/Weather_icons/haze.svg"
                } else if (id >= 801 && id <= 804) {
                        wIcon.src = "weather-app-icons/Weather_icons/cloud.svg"
                } else if ((id >= 300 && id <= 321) || (id >= 500 && id <= 531)) {
                        wIcon.src = "weather-app-icons/Weather_icons/rain.svg"
                }

                // changing the temp details
                wrapper.querySelector(".temp .numb").innerText = temp;
                wrapper.querySelector(".weather").innerText = description;
                wrapper.querySelector(".location span").innerText = `${city}, ${country}`
                wrapper.querySelector(".temp .numb-2").innerText = feels_like;
                wrapper.querySelector(".humidity span").innerText = humidity + "%";

                infoTxt.classList.remove("pending", "error");
                wrapper.classList.add("active");
                console.log(result);
        }
}

arrowBack.addEventListener("click", () => {
        wrapper.classList.remove("active");
})
