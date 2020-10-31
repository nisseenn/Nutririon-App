import React, { useState, useReducer, useCallback, useEffect, useRef } from 'react'
import { ScrollView, View, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Text, Button, ActivityIndicator, Alert, Image, Dimensions } from 'react-native'
import { fetchUserData } from '../store/actions/auth'
import { fetchIngredients } from '../store/actions/nutrition'
import { useDispatch, useSelector } from 'react-redux'
import CalendarStrip from 'react-native-calendar-strip';

const {width,height} = Dimensions.get('window')

const CalendarScreen = () => {
  const dispatch = useDispatch()

  //Returning the JSX code
  return(
    <View style={styles.wrapper}>
      <CalendarStrip
        onDateSelected={(date) => console.log(date)}
        // scrollable={true}
        style={{flex:1, height:200, paddingTop: 100, paddingBottom: 10}}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper:{
    flex:1,
  }
})

//Exporting the component so that we can use it in other components
export default CalendarScreen
