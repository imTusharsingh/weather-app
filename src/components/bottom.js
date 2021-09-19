import React from 'react'

const Bottom = ({ info }) => {

    const { temp,
        humidity,
        pressure,
        speed,
        visibility,
        deg,
        main } = info
    return (
        <>
            <div className="bottom_container">
                <div className="data">
                  
                    <span className="temp">{temp}°C  <i className="wi wi-thermometer"></i></span>
                    <span className="condition">{main}</span>
                </div>
                <div className="bottom">
                    <span className="info">Pressure <br /> {pressure} mb</span>
                    <span className="info">Humidity  <br />{humidity}%</span>
                    <span className="info">Visibilty <br />{visibility}m</span>
                    <span className="info extra ">Wind <br />
                        <div className="wind">
                            <span className="speed">Speed <br />{speed}km/hr</span>
                            <span className="deg">Angle <br />{deg}°</span>
                        </div>
                    </span>
                </div>
            </div>
        </>
    )
}

export default Bottom
