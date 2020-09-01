//The HomeScreen will cointain:
// 1. recommended daily calorie intake
// 2. Daily dietary intake
// 3. Suggestion carousel, which can be viewd as a list, then user will be taken to suggestionscreen

//Importing the react native and react components
import React, { useState, useReducer, useCallback, useEffect, useRef } from 'react'
import { ScrollView, View, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Text, Button, ActivityIndicator, Alert, Image, Dimensions } from 'react-native'

//Defining HomeScreen functional component
const HomeScreen = () => {
  //Returning the JSX code
  return(
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>
        HomeScreen
      </Text>
    </View>
  )
}

//Exporting the component so that we can use it in other components
export default HomeScreen
