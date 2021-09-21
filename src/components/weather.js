/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import Bottom from './bottom'
import Icon from './Icon'
import "./weather.css"
const Weather = () => {

    const [input, setinput] = useState("delhi")
    const [info, setinfo] = useState("")
    const [userloc, setuserloc] = useState({})
    const [isinput, setisinput] = useState(false)


//------------------------getting live location of user---------------------------------

//checking location is active or not
    const location = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(geoSuccess, geoError)
        }
        else {
            console.log("location not active")  
        }
    }

//getting longitude and latitude of user(location active)   
    function geoSuccess(position) {
        const lon = position.coords.longitude;
        const lat = position.coords.latitude;
        setuserloc({
            userlon: lon,
            userlat: lat
        })
    }

//alerting the user and setting random latitude and longitude (location not active)    
    function geoError() {
        alert("Geocoder failed.");
        setuserloc({
            userlat : 	28.653,
            userlon : 	77.228
        })
    }
//destructuring the location
    const { userlon, userlat } = userloc;

    // console.log(userloc)

//--------------------------------------------------------------------------------------

//--------------------------------GETTING THE DATA----------------------------
    const search = async () => {
        try {
            let url;
            if (isinput === true) {
                url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&&appid=8b75858b6d1405245fd495370bf2ff23`
            }
            else if (userloc!==undefined) {
                url = `https://api.openweathermap.org/data/2.5/weather?lat=${userlat}&lon=${userlon}&units=metric&appid=8b75858b6d1405245fd495370bf2ff23`
            }
            console.log(url)

            let res = await fetch(url);
            let data = await res.json()

//destructuring the data

            const { temp, humidity, pressure } = data.main
            const { name, visibility } = data
            const { speed, deg } = data.wind
            const { country } = data.sys
            const { main } = data.weather[0];
            // console.log(visibility)
//storing data in state variable

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

//--------------------------------------------------------------------------------------

//-------------------RUNNING THE PROGRAM WHEN PAGE REFRESH-------------------------------
   
    useEffect(() => {
        location()
        if(userlon!==undefined){
        search()
            // setisinput(true)
        }
    }, [userlon])

//----------------------------------------------------------------------------------------

    const {
        name,
        main, country } = info
       
  
    return (
        <>
       
            <div className="main">
                <div className="city"><p>{name},{country}</p> 
                <p className={isinput?"live not":"live"}>LIVE</p>
                </div>
                <div className="wrapper">
                    <div className="top">
                        <Icon main={main} />

                        <div className="search_container">
                            <input type="text" value={input} onChange={(e) => setinput(e.target.value)} />
                            <button onClick={() => { search()}} onMouseOver={()=>{setisinput(true)}}>
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
