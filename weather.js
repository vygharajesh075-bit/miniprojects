const WEATHER_KEY = "d301c5a94c1b49f6deae73e9cd556f23";

/* AUTO LOCATION */
function getLocationWeather() {
    const result = document.getElementById("weatherResult");

    if (!navigator.geolocation) {
        result.innerText = "Geolocation not supported ❌";
        return;
    }

    result.innerText = "Getting location... 📍";

    navigator.geolocation.getCurrentPosition(
        (pos) => {
            const { latitude, longitude } = pos.coords;
            fetchWeatherByCoords(latitude, longitude);
        },
        () => {
            result.innerText = "Permission denied ❌";
        }
    );
}

/* FETCH BY CITY */
function getWeather() {
    const city = document.getElementById("city").value.trim();
    if (!city) return;

    fetchWeatherByCity(city);
}

/* FETCH USING CITY */
async function fetchWeatherByCity(city) {
    const result = document.getElementById("weatherResult");
    result.innerHTML = "Loading... 🌍";

    try {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_KEY}&units=metric`
        );

        if (!res.ok) throw new Error("API error");

        const data = await res.json();
        displayWeather(data);

    } catch (err) {
        console.error(err);
        result.innerText = "Failed to fetch weather ❌";
    }
}

/* FETCH USING GPS */
async function fetchWeatherByCoords(lat, lon) {
    const result = document.getElementById("weatherResult");
    result.innerHTML = "Detecting location... 📍";

    try {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_KEY}&units=metric`
        );

        if (!res.ok) throw new Error("API error");

        const data = await res.json();
        displayWeather(data);

    } catch (err) {
        console.error(err);
        result.innerText = "Failed to fetch location weather ❌";
    }
}

/* DISPLAY UI */
function displayWeather(data) {
    const result = document.getElementById("weatherResult");

    if (!data || data.cod !== 200) {
        result.innerText = "City not found ❌";
        return;
    }

    const condition = data.weather[0].main.toLowerCase();

    // ICON LOGIC
    let icon = "☁";
    if (condition.includes("clear")) icon = "☀";
    else if (condition.includes("rain")) icon = "🌧";
    else if (condition.includes("cloud")) icon = "☁";
    else if (condition.includes("storm")) icon = "⛈";

    // Apply background safely
    applyWeatherTheme(condition);

    result.innerHTML = `
        <div class="weather-card">
            <h2>${icon} ${data.name}</h2>
            <h1>${data.main.temp}°C</h1>
            <p>${data.weather[0].description}</p>

            <div class="weather-extra">
                <span>💧 ${data.main.humidity}%</span>
                <span>🌬 ${data.wind.speed} m/s</span>
            </div>
        </div>
    `;
}

/* SAFE BACKGROUND SYSTEM */
function applyWeatherTheme(condition) {
    const body = document.body;

    // Remove previous classes
    body.classList.remove("sunny", "rainy", "cloudy");

    if (condition.includes("clear")) {
        body.classList.add("sunny");
    } else if (condition.includes("rain")) {
        body.classList.add("rainy");
    } else if (condition.includes("cloud")) {
        body.classList.add("cloudy");
    }
}