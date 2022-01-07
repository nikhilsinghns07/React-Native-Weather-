import React, { useState ,useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import Weather from './Weather'
import Geolocation from '@react-native-community/geolocation'

const Data = () => {
    const currentLocation =  useEffect(() => {
        (async () => {
             Geolocation.getCurrentPosition(info => {
                let coords;
                coords = info.coords
                //fetchDataFromApi(coords.latitude,coords.longitude)
                fetchDailyDatafromApi(coords.latitude,coords.longitude)
        });
        }) ()
    }, [currentLocation])

    const [data,setData] = useState({})
    const [daily,setDaily] = useState({})
    
    // const fetchDataFromApi = (latitude,longitude) => {
    //     if (latitude && longitude) {
    //     fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&units=metric&appid=4f75b23f0106d171ddb805d1553bf84a`).then((res) => res.json()).then((data) => {
    //         console.log(data)
    //         setData(data)
    //     }).catch((error) => {
    //         console.error(error)
    //     })
    //     }
    // }

    const fetchDailyDatafromApi = (latitude,longitude) => {
        if (latitude && longitude) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=4f75b23f0106d171ddb805d1553bf84a`).then((res) => res.json())
        .then((data) => {
            console.log(data)
            setDaily(data)
        }).catch((error) => {
            console.error(error)
        })
    }
    }

    return (
        <ScrollView>
            <Weather />     
        </ScrollView>
    )
}

export default Data
