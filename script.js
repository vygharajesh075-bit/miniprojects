async function getForecast(city) {
    const apiKey = "YOUR_API_KEY_HERE";

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    const res = await fetch(url);
    const data = await res.json();

    const forecastDiv = document.getElementById("forecast");
    forecastDiv.innerHTML = "<h3>5-Day Forecast</h3>";

    
    const dailyData = data.list.filter(item => item.dt_txt.includes("12:00:00"));

    dailyData.forEach(day => {
        const date = new Date(day.dt_txt).toDateString();
        const temp = day.main.temp;
        const desc = day.weather[0].description;

        const card = `
            <div class="card">
                <p>${date}</p>
                <p>🌡 ${temp}°C</p>
                <p>☁ ${desc}</p>
            </div>
        `;

        forecastDiv.innerHTML += card;
    });
}