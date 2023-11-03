window.addEventListener('load', () => {
    let lon;
    let lat;
  
    const temperaturaValor = document.querySelector('.temperatura-valor');
    const temperaturaDescripcion = document.querySelector('.temperatura-descripcion');
    const ubicacion = document.querySelector('.ubicacion');
    const iconoAnimado = document.querySelector('.icono-animado');
    const vientoVelocidad = document.querySelector('.viento-velocidad');
  
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((posicion) => {
            lon = posicion.coords.longitude;
            lat = posicion.coords.latitude;
            
            // Ubicación por ciudad
            const url = `https://api.openweathermap.org/data/2.5/weather?q=San+Luis&lang=es&units=metric&appid=4ca9b62ba846f31b6a9bc37d6831ecdf`;
  
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    const temp = Math.round(data.main.temp);
                    temperaturaValor.textContent = temp + "°C";
  
                    const desc = data.weather[0].description;
                    temperaturaDescripcion.textContent = desc.toUpperCase();
                    ubicacion.textContent = data.name;
                    vientoVelocidad.textContent = `${data.wind.speed} m/s`;
  
                    // Para iconos dinámicos
                    const weatherMain = data.weather[0].main;
                    setWeatherIcon(iconoAnimado, weatherMain);
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    }
  });
  
  function setWeatherIcon(element, weatherMain) {
    switch (weatherMain) {
        case 'Thunderstorm':
            element.src = 'https://mimirivero.github.io/miercoles/thunder.svg';
            break;
        case 'Drizzle':
            element.src = 'https://mimirivero.github.io/miercoles/rainy-2.svg';
            break;
        case 'Rain':
            element.src = 'https://mimirivero.github.io/miercoles/rainy-7.svg';
            break;
        case 'Snow':
            element.src = 'https://mimirivero.github.io/miercoles/snowy-6.svg';
            break;
        case 'Clear':
            element.src = 'https://mimirivero.github.io/miercoles/day.svg';
            break;
        case 'Atmosphere':
            element.src = 'https://mimirivero.github.io/miercoles/weather.svg';
            break;
        case 'Clouds':
            element.src = 'https://mimirivero.github.io/miercoles/cloudy-day-1.svg';
            break;
        default:
            element.src = 'https://mimirivero.github.io/miercoles/cloudy-day-1.svg';
    }
  }

  
