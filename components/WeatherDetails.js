import React from 'react'
import { View, Text ,StyleSheet } from 'react-native'
import Temp from 'react-native-vector-icons/MaterialCommunityIcons'
const WeatherDetails = ({details}) => {
    return (
        <View style={styles.main}>
            <View>

            </View>
            <View style={styles.details}>
                <Text style={{fontSize : 20,}}>Sunrise {new Date(details.sunrise * 1000).toLocaleTimeString()} am</Text>
                <Text style={{fontSize : 20,}}>Humidity {details.humidity}%</Text>    
            </View>

            <View style={styles.details}>
                <Text style={{fontSize : 20,}}>Sunset {new Date(details.sunset * 1000).toLocaleTimeString()} pm</Text>
                <Text style={{fontSize : 20,}}>Pressure {details.pressure} Pa</Text>
            </View>
            
            <View style={styles.details}>
                <Text style={{fontSize : 20,}}>Wind speed {details.wind_speed}  kmph</Text>
            </View>
            

        </View>
    )
}

const styles = StyleSheet.create({
    main:{
        backgroundColor : '#00000033',
        marginBottom : 50,
    },
    details : {
        flexDirection:'row',
        justifyContent:'space-between',
        margin: 20,
    }
})

export default WeatherDetails
