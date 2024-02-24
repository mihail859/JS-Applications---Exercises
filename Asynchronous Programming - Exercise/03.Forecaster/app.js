async function attachEvents() {
    const getWeatherBtn = document.getElementById('submit');

    getWeatherBtn.addEventListener('click', returnForecast);

    async function returnForecast() {
        try {
            const weatherSymbols = {
                'Sunny': '&#x2600;',        // ☀
                'Partly sunny': '&#x26C5;', // ⛅
                'Overcast': '&#x2601;',     // ☁
                'Rain': '&#x2614;',         // ☂
                'Degrees': '&#176;'         // °
            };

            const forecastDiv = document.getElementById('forecast');
            const currentForecast = document.getElementById('current');
            const upcomingForecast = document.getElementById('upcoming');
            const location = document.getElementById('location').value;
            let code = '';

            const response = await fetch('http://localhost:3030/jsonstore/forecaster/locations');
            const dataObj = await response.json();
            let isLocationFound = false;
            for (let obj of dataObj) {
                if (obj.name === location) {
                    isLocationFound = true;
                    code += obj.code;
                    break;
                }
            }
            if (!isLocationFound) {
                throw new Error();
            }

            
            const responseForCurrentForecast = await fetch(`http://localhost:3030/jsonstore/forecaster/today/${code}`);
            const dayForecast = await responseForCurrentForecast.json();

            let condition = dayForecast.forecast.condition;
            let symbol = weatherSymbols[condition];
            let high = dayForecast.forecast.high;
            let low = dayForecast.forecast.low;
            let name = dayForecast.name;

            let divDayForecast = document.createElement('div');
            divDayForecast.classList.add('forecasts');
            if(divDayForecast.hasChildNodes()){
                divDayForecast.innerHTML = '';
            }

            let symbolSpan = document.createElement('span');
            symbolSpan.classList.add('condition', 'symbol');
            symbolSpan.innerHTML = symbol;

            let spanWrapperDayForecast = document.createElement('span');
            spanWrapperDayForecast.classList.add('condition');

            let nameSpan = document.createElement('span');
            nameSpan.classList.add('forecast-data');
            nameSpan.textContent = name;

            let tempSpan = document.createElement('span');
            tempSpan.classList.add('forecast-data');
            tempSpan.textContent = `${low}\u00B0/${high}\u00B0`;

            let conditionSpan = document.createElement('span');
            conditionSpan.classList.add('forecast-data');
            conditionSpan.textContent = condition;

            spanWrapperDayForecast.appendChild(nameSpan);
            spanWrapperDayForecast.appendChild(tempSpan);
            spanWrapperDayForecast.appendChild(conditionSpan);

            divDayForecast.appendChild(symbolSpan);
            divDayForecast.appendChild(spanWrapperDayForecast);

            forecastDiv.style.display = 'block';
            currentForecast.appendChild(divDayForecast);

            /* Check if upcomingForecast already has child nodes, and if it does, remove them */
            

            const responseForUpcomingForecast = await fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${code}`);
            const upcomingForecastData = await responseForUpcomingForecast.json();

            const forecastInfoDiv = document.createElement('div');
            forecastInfoDiv.classList.add('forecast-info');
            if(forecastInfoDiv.hasChildNodes()){
                forecastInfoDiv.innerHTML = '';
            }

            for (let day of upcomingForecastData.forecast) {
                const upcomingSpan = document.createElement('span');
                upcomingSpan.classList.add('upcoming');

                const symbolSpan = document.createElement('span');
                symbolSpan.classList.add('symbol');
                symbolSpan.innerHTML = weatherSymbols[day.condition];

                const highLowSpan = document.createElement('span');
                highLowSpan.classList.add('forecast-data');
                highLowSpan.textContent = `${day.low}\u00B0/${day.high}\u00B0`;

                const conditionSpan = document.createElement('span');
                conditionSpan.classList.add('forecast-data');
                conditionSpan.textContent = day.condition;

                upcomingSpan.appendChild(symbolSpan);
                upcomingSpan.appendChild(highLowSpan);
                upcomingSpan.appendChild(conditionSpan);

                forecastInfoDiv.appendChild(upcomingSpan);
            }

            upcomingForecast.appendChild(forecastInfoDiv);
        } catch (error) {
            document.getElementById('forecast').style.display = 'block';
            document.getElementById('forecast').textContent = 'Error';
        }
    }
}

attachEvents();
