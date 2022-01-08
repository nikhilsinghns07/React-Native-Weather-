import React from 'react'
import { View, Text } from 'react-native'
import Temp from 'react-native-vector-icons/MaterialCommunityIcons'
const WeatherDetails = ({details}) => {
    return (
        <View>
            <Text>{new Date(details.sunrise * 1000).toLocaleTimeString()}</Text>
            <Text>{new Date(details.sunset * 1000).toLocaleTimeString()}</Text>
            
            <Text>{details.pressure} Pa</Text>
            <Text>{details.humidity}%</Text>
            <Text>{details.wind_speed}kmph</Text>

        </View>
    )
}

export default WeatherDetails
