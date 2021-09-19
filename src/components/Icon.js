
import React from 'react'

const Icon = ({ main }) => {
    const [weatherIcon, setWeatherIcon] = React.useState("")

    React.useEffect(() => {

        if (main) {
            switch (main) {
                case "Clouds": setWeatherIcon("wi-cloudy")
                    break;
                case "Haze": setWeatherIcon("wi-fog")
                    break;
                case "Clear": setWeatherIcon("wi-day-sunny")
                    break;
                case "Mist": setWeatherIcon("wi-dust")
                    break;
                case "Rain": setWeatherIcon("wi-rain")
                    break;
                case "Thunderstrom": setWeatherIcon("wi-strom-showers")
                    break;
                case "Smoke": setWeatherIcon("wi-smoke")
                    break;
                case "Smog": setWeatherIcon("wi-smog")
                    break;
                case "Snow": setWeatherIcon("wi-snow")
                    break;
                default:
                    setWeatherIcon("wi-day-sunny");
                    break;
            }
        }

    }, [main]);

    return (
        <>
            <div className="iconify">
                <i className={`wi ${weatherIcon}`}></i>
            </div>
        </>
    )
}

export default Icon
