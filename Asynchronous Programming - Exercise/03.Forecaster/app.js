function attachEvents() {
   
    const getWeatherBtn = document.getElementById('submit');


    getWeatherBtn.addEventListener('click', returnForecast);

    async function  returnForecast(){
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
        
            const response = await fetch('http://localhost:3030/jsonstore/forecaster/locations')
            const dataObj = await response.json();
            let isLocationFound = false;
            for (let obj of dataObj){
                
                if (obj.name === location){
                    isLocationFound = true;
                    code += obj.code;
                    break;
                }
            }
            if(!isLocationFound){
                throw new Error();
            }
            const responseForCurrentForecast = await fetch(`http://localhost:3030/jsonstore/forecaster/today/${code}`);
            const dayForecast = await responseForCurrentForecast.json();
            
            let condition = dayForecast.forecast.condition;
            let high = dayForecast.forecast.high;
            let low = dayForecast.forecast.low;
            let name = dayForecast.name;

            console.log(condition, high, low, name)

    
    
    
        } catch (error) {
            console.log('error')
        }
    }

}

attachEvents();