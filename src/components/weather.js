/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import Bottom from './bottom'
import Icon from './Icon'
import "./weather.css"
const Weather = () => {

    const [input, setinput] = useState("delhi")
    const [info, setinfo] = useState("")


    const search = async () => {
        try {
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&&appid=9bcf454495f5629f05614b1e44ecb372`
            let res = await fetch(url);
            let data = await res.json()

            const { temp, humidity, pressure } = data.main
            const { name, visibility } = data
            const { speed, deg } = data.wind
            const { country } = data.sys
            const { main } = data.weather[0];
            // console.log(visibility)

            const myNewData = {
                temp,
                humidity,
                pressure,
                speed,
                visibility,
                deg,
                name,
                main,
                country
            }

            setinfo(myNewData)
            setinput("")
        }
        catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {

        search();

    }, [])

    const {
        name,
        main, country } = info



    return (
        <>

            <div className="main">
                <div className="city">{name},{country}</div>
                <div className="wrapper">
                    <div className="top">
                        <Icon main={main} />

                        <div className="search_container">
                            <input type="text" value={input} onChange={(e) => setinput(e.target.value)} />
                            <button onClick={search} >
                                <i className="fa fa-search" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                    <Bottom info={info} />
                </div>
            </div>

        </>
    )
}

export default Weather
