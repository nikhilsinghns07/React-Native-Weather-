import React, {useEffect,useState} from 'react'
import { View, Text ,StyleSheet, Image , TouchableOpacity} from 'react-native'
import Geolocation from '@react-native-community/geolocation'
import { MaterialCommunityIcons , Feather  } from 'react-native-vector-icons'
import WeatherScroll from './WeatherScroll';

const Weather = () => {

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
            setDaily(data)
        }).catch((error) => {
            console.error(error)
        })
    }
    }

    return (
        <View>
            <View style={styles.menu}>
                <Text style={styles.place}> {daily.name} {daily.sys.country}  </Text>
                <Text style={{color:'white',fontSize : 20,marginRight: 10,}}> </Text>
            </View>
            
            <View style={styles.dateView}>
                <Text style={styles.date}></Text>
            </View>

{/*
            <View style={styles.tempView}>
                <Text style={styles.temp}> {curr}  <MaterialCommunityIcons name="temperature-celsius" size={45} color="white" /> </Text> 
                <Text style={{color : 'white',fontSize:17}}> {weather} </Text> 
                <Image source={{uri: `http://openweathermap.org/img/wn/${icon}@2x.png`}} style={{height : 50,width:50}}/>
            </View>

            <View style={styles.detailsView}> 
                <Text style={styles.detailsText}>Maximum      {maximum} <MaterialCommunityIcons name="temperature-celsius" size={30} color="black" /></Text>
                <Text style={styles.detailsText}>Minimum      {minimum} <MaterialCommunityIcons name="temperature-celsius" size={30} color="black" /></Text>
                <Text style={styles.detailsText}>Feels Like     {feels_like} <MaterialCommunityIcons name="temperature-celsius" size={30} color="black" /> </Text>
                <Text style={styles.detailsText}>Wind Speed  {windSpeed} km/h  <Feather name="wind" size={24} color="black" /></Text>
                <Text style={styles.detailsText}>Sunrise          {sunriseDaily} am <Feather name="sunrise" size={26} color="black" /> </Text> 
                <Text style={styles.detailsText}>Sunset           {sunsetDaily} pm <Feather name="sunset" size={26} color="black" /> </Text>
                <Text style={styles.detailsText}>Pressure        {pressure} hPa</Text>
                <Text style={styles.detailsText}>Humidity        {humidity}% </Text>
            </View>
            <WeatherScroll weatherData={data.daily}/> */}

        </View>
    )
}

export default Weather


const styles = StyleSheet.create({
    menu :{
        flexDirection :'row',
        justifyContent :'space-between',
        borderBottomWidth : 5,
        borderBottomColor : 'white',
        paddingTop: 5,
        paddingBottom: 10,
        marginLeft : 7,
        marginRight : 7,
    },
    place : {
        fontSize:20,
        color: 'white',
    },
    date :{
        fontSize : 40,
        color : '#ffe4e1',
        paddingLeft :60,
        fontFamily : 'sans-serif-condensed',
        borderRadius : 15,
    },
    dateView : {
        marginTop : 20,
        paddingLeft : 30,
        paddingRight:35,
        paddingBottom : 40,
    },
    tempView : {
        flexDirection :'row',
        backgroundColor : '#00000033',
        padding: 5,
        borderRadius : 10,
        borderColor : 'white',
        borderWidth : 1,
        marginBottom : 30,
        marginHorizontal : 20,
    },
    temp : {
        color: 'white',
        fontSize : 30,
        padding: 3,
    },
    detailsView : {
        fontSize : 20,
        color : 'black',
        padding: 10,
        backgroundColor:'#e6e6fa',
        borderRadius : 15,
        marginLeft : 25,
        marginRight : 45,
        marginBottom : 30,
    },
    detailsText : {
        fontSize : 20,
        color : 'black',
        paddingLeft : 40,
        padding:   2,
    },
})