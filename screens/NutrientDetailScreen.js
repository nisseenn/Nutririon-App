import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import { useDispatch } from 'react-redux'

//Defining HomeScreen functional component
const NutrientDetailScreen = () => {

  //Returning the JSX code
  return(
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>
        NutrientDetailScreen
      </Text>
    </View>
  )
}

//Exporting the component so that we can use it in other components
export default NutrientDetailScreen
