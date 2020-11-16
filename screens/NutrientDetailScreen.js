import React from 'react'
import { View, Text } from 'react-native'

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
