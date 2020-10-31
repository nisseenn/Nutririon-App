import React, { useState, useReducer, useCallback, useEffect, useRef } from 'react'
import { ScrollView, View, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Text, Button, ActivityIndicator, Alert, Image, Dimensions } from 'react-native'
import { fetchUserData } from '../store/actions/auth'
import { fetchIngredients } from '../store/actions/nutrition'
import { useDispatch, useSelector } from 'react-redux'
import CalendarStrip from 'react-native-calendar-strip';
import Colors from '../constants/Colors'
import * as Animatable from 'react-native-animatable';

const {width,height} = Dimensions.get('window')

const Calendar = (props) => {
  const dispatch = useDispatch()

  //Returning the JSX code
  return(
    <Animatable.View
      useNativeDriver
      animation="fadeInDown"
      duration={200}
      delay={200}
      style={styles.wrapper}>
      <CalendarStrip
        scrollable
        minDate={'2020-10-01'}
        maxDate={'2021-10-01'}
        daySelectionAnimation={{type: 'background', highlightColor: Colors.accentColor}}
        calendarColor={{color: 'white'}}
        calendarHeaderStyle={{color: "#000", fontSize: width / 14}}
        dateNumberStyle={{color: "#000", fontSize: 22}}
        iconContainer={{flex: 0.1}}
        onDateSelected={(date) => props.onSelectDate(date)}
        style={{flex:1, height:200, paddingTop: 100, paddingBottom: 10}}
      />
    </Animatable.View>
  )
}

const styles = StyleSheet.create({
  wrapper:{
    flex:1,
  }
})

//Exporting the component so that we can use it in other components
export default Calendar
