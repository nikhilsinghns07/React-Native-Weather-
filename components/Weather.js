import React, {useEffect,useState} from 'react'
import { View, Text ,StyleSheet, Image , TouchableOpacity, Button} from 'react-native'
import Geolocation from '@react-native-community/geolocation'
import Icon from 'react-native-vector-icons/FontAwesome';
import Temp from 'react-native-vector-icons/MaterialCommunityIcons'
import WeatherScroll from './WeatherScroll'
import WeatherDetails from './WeatherDetails';
const Weather = () => {
    const reloadPage = () => {}

    const [data,setData] = useState({})
    const [daily,setDaily] = useState({})
    const [weather,setWeather] = useState({})
    const [sys,setSys] = useState({})
    const [dt,setDate] = useState()
    const [current,setCurrent] = useState({})
    const [icon,setIcon]  = useState()
    const [time,setTime] = useState()
    const [dailyForecast,setDailyForecast] = useState({})
    

    useEffect(() => {
        let timer = setInterval( () => {
            setTime(new Date().getHours() + ':' + new Date().getMinutes() )
        },1000)

        return () => clearInterval(timer)
    } , [])

    const currentLocation =  useEffect(() => {
        (async () => {
             Geolocation.getCurrentPosition(info => {
                let coords;
                coords = info.coords
                fetchDataFromApi(coords.latitude,coords.longitude)
                fetchDailyDatafromApi(coords.latitude,coords.longitude)
                setIcon(weather.icon)
        });
        }) ()
    }, [currentLocation])

  

    const fetchDataFromApi = (latitude,longitude) => {
        if (latitude && longitude) {
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&units=metric&appid=4f75b23f0106d171ddb805d1553bf84a`).
        then((res) => res.json()).
        then((data) => {
            setData(data)
            setCurrent(data.current)
            setDailyForecast(data.daily)
            
        }).catch((error) => {
            console.error(error)
        })
        }
    }

    const fetchDailyDatafromApi = (latitude,longitude) => {
        if (latitude && longitude) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=4f75b23f0106d171ddb805d1553bf84a`)
        .then((res) => res.json())
        .then((data) => {
            setDaily(data)
            setWeather(data.weather[0])
            setSys(data.sys)
            let date
            date = new Date(data.dt * 1000).toDateString()
            setDate(date)
            
        }).catch((error) => {
            console.error(error)
        })
    }
    }

    

    return (
        <View>
            <View style={styles.menu}>
                <Icon.Button name="refresh" size={15} color="white" backgroundColor='black'> Refresh</Icon.Button>
                <Text style={styles.place}> {daily.name}  {sys.country} </Text>
                <Text style={{color:'white',fontSize : 20,marginRight: 10,}}> {weather.main} </Text>   
            </View>
            
            <View style={styles.dateView}>
                <Text style={styles.date} >       {time}</Text>
                <Text style={styles.date}>{dt}</Text>
            </View>

            <Text style={{fontSize:80,textAlign:'center',paddingBottom:20}}>{Math.round(current.temp)} <Temp name="temperature-celsius" size={30} /> </Text>
            <View style={styles.tempView}>
                <Text style={{fontSize:20}}>{weather.description} </Text>
                <Text>Feels Like {Math.round(current.feels_like)} <Temp name="temperature-celsius" size={15} /></Text>
                <Image source={{uri: `http://openweathermap.org/img/wn/${icon}@2x.png`}} style={{height : 75,width:75}}/>
            </View>
            
            <WeatherDetails details={current}/>
            <WeatherScroll weatherData={dailyForecast}/>
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
        fontSize : 35,
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
        justifyContent:'center',
        padding: 10,
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