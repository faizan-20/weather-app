const findWeather = async (location) => {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=60c387173ae64edd9fd80520232506&q=${location}`, {mode: 'cors'});
        const weatherData = await response.json();
        return weatherData;
    } catch (err) {
        console.log(err);
    }
}

const digData = async (location) => {
    const rawWeather = await findWeather(`${location}`);
    const currCondition = rawWeather.current.condition.text;
    const currIcon = rawWeather.current.condition.icon;
    const currTempC = rawWeather.current.temp_c;
    const currTempF = rawWeather.current.temp_f;
    const currFeelsLikeC = rawWeather.current.feelslike_c;
    const currFeelsLikeF = rawWeather.current.feelslike_f;
    const currCountry = rawWeather.location.country;
    const currName = rawWeather.location.name;
    const currRegion = rawWeather.location.region; 

    let weatehrReport = {
        'condition': currCondition,
        'icon': currIcon,
        'temp_c': currTempC,
        'temp_f': currTempF,
        'feelslike_c': currFeelsLikeC,
        'feelslike_f': currFeelsLikeF,
        'country': currCountry,
        'name': currName,
        'region': currRegion
    }

    display(weatehrReport);
}

const search = document.querySelector('#search-btn');
const findLocation = document.querySelector('#location-inp');

search.addEventListener('click', () => {
    let currLocation = findLocation.value;
    digData(currLocation);
});

findLocation.addEventListener('keypress', (e) => {
    if (e.key === "Enter"){
        search.click();
    }
});

const display = async (weatherReport) => {
    const icon = document.querySelector('#weather-icon');
    const condition = document.querySelector('#condition');
    const place = document.querySelector('#nameplace');
    const temp = document.querySelector('#temp_c');
    const country = document.querySelector('#country');
    const feels = document.querySelector('#feels');

    icon.src = weatherReport.icon;
    condition.textContent = weatherReport.condition;
    place.textContent = weatherReport.name;
    country.textContent = weatherReport.country;
    temp.textContent = weatherReport.temp_c + "C";
    feels.textContent = "Feels like " + weatherReport.feelslike_c + "C";
}

digData("bhilai");