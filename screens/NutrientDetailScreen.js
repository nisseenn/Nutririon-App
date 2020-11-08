import React, { useState, useReducer, useCallback, useEffect, useRef } from 'react'
import { ScrollView, View, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Text, Button, ActivityIndicator, Alert, Image, Dimensions } from 'react-native'
import { fetchUserData } from '../store/actions/auth'
import { fetchIngredients } from '../store/actions/nutrition'
import { useDispatch, useSelector } from 'react-redux'

//Defining HomeScreen functional component
const NutrientDetailScreen = () => {
  const dispatch = useDispatch()

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
