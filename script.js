document.addEventListener('DOMContentLoaded', function() {
    const API_KEY = 'ee4f612fdb69690f8bd11cde1fc1d3c1';
    const form = document.querySelector('#weatherCheck');
    const weather = document.querySelector('#parent');
    const search = document.querySelector('#search');

    const getWeather = async (city) => {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('City not found!');
            }
            const data = await response.json();
            showWeather(data, city);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const showWeather = (data, city) => {
        console.log(data);
        const temp = Math.floor(data.list[0].main.temp);
        const currentDate = new Date();
        const currentHour = currentDate.getHours();
        const sunriseTime = new Date(data.city.sunrise * 1000);
        const sunsetTime = new Date(data.city.sunset * 1000);

        let greeting = '';
        let timeMessage = '';
        let weatherIcon = './icon.png'; // Default weather icon
        let sunIcon = './sun-icon.webp'; // Default sun icon
        let windIcon = './wind-icon.png'; // Default wind icon
        let temperatureIcon = './temperature.webp'; // Default temperature icon

        if (currentHour >= 5 && currentHour < 12) {
            greeting = 'Good Morning';
            timeMessage = `<div style="font-size: 7px;">SUNRISE</div><div style="font-size: 10px;" class="a">${sunriseTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>`;
            weatherIcon = './icon.png'; // Update weather icon for evening
            sunIcon = './sun icon.webp'; // Update sun icon for evening
            windIcon = './wind icon2.png'; // Update wind icon for evening
            temperatureIcon = './temprature.webp'; // Update temperature icon for evening
        } else if (currentHour >= 12 && currentHour < 17) {
            greeting = 'Good Afternoon';
            timeMessage = `<div style="font-size: 7px;">SUNRISE</div><div style="font-size: 10px;" class="a">${sunriseTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>`;
            weatherIcon = './sung.png'; // Update weather icon for evening
            sunIcon = './sun icon.webp'; // Update sun icon for evening
            windIcon = './wind icon2.png'; // Update wind icon for evening
            temperatureIcon = './temprature.webp'; // Update temperature icon for evening
        } else if (currentHour >= 17 && currentHour < 21) {
            greeting = 'Good Evening';
            timeMessage = `<div style="font-size: 7px;">SUNSET</div><div style="font-size: 10px;" class="a">${sunsetTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>`;
            weatherIcon = './evinig.webp'; // Update weather icon for evening
            sunIcon = './sun icon.webp'; // Update sun icon for evening
            windIcon = './wind icon2.png'; // Update wind icon for evening
            temperatureIcon = './temprature.webp'; // Update temperature icon for evening
        } else {
            greeting = 'Good Night';
            timeMessage = `<div style="font-size: 7px;">SUNSET</div><div style="font-size: 10px;" class="a">${sunsetTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>`;
            weatherIcon = './moon.png'; // Update weather icon for night
            sunIcon = './sun icon.webp'; // Update sun icon for night
            windIcon = './wind icon2.png'; // Update wind icon for night
            temperatureIcon = './temprature.webp'; // Update temperature icon for night
        }

        weather.innerHTML = `
        <div class="upper">
            <div id="parent">
                <div id="first">
                    <form id="weatherCheck">
                        <input type="search" name="search" id="search" placeholder="Enter city name">
                        <button type="submit">Get Weather</button>
                    </form>
                    <p style="font-size: 15px;">${city}</p>
                    <p style="font-size: 15px;">${currentDate.toLocaleString('en-US', { weekday: 'long', hour: 'numeric', minute: 'numeric', timeZone: 'Asia/Karachi' })}</p>
                    <div id="icon">
                        <img id="weatherIcon" src="${weatherIcon}" alt="loading" height="70px">
                    </div>
                </div>
                <div id="second">
                    <p style="font-size: 25px;">${temp}℃</p>
                    <p style="font-size: 12px;">${greeting}</p>
                    <img src="./line.png" alt="loading" width="40px">
                </div>
                <div class="main">
                    <div class="child" id="child1">
                        <img src="${sunIcon}" alt="Sun Icon" height="30px" width="30px">
                        <p style="font-size: 7px;">${timeMessage}</p>
                    </div>
                    <div class="line">
                        <img src="./vertical.png" alt="loading" height="30px">
                    </div>
                    <div class="child" id="child2">
                        <img src="${windIcon}" alt="Wind Icon" height="30px">
                        <p style="font-size: 7px;">WIND</p>
                        <p style="font-size: 10px;">${data.list[0].wind.speed.toFixed(1)} m/s</p>
                    </div>
                    <div class="line">
                        <img src="./vertical.png" alt="loading" height="30px">
                    </div>
                    <div class="child" id="child3">
                        <img src="${temperatureIcon}" alt="Temperature Icon" height="30px">
                        <p style="font-size: 7px;">TEMPERATURE</p>
                        <p style="font-size: 10px;">${temp}°</p>
                    </div>
                </div>
            </div>
        </div>
        `;
    };

    // Event listener for form submission
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            getWeather(search.value.trim());
        });
    } else {
        console.error('Form element not found.');
    }
});
