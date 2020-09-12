//Importing the react native and react components
import React, { useState, useReducer, useCallback, useEffect, useRef } from 'react'
import { ScrollView, View, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Text, Button, ActivityIndicator, Alert, Image, Dimensions } from 'react-native'
import Colors from '../constants/Colors'

import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const {width,height} = Dimensions.get('window')
//Defining HomeScreen functional component
const GenderScreen = (props) => {
  //Setting state for the gender
  const [gender, setGender] = useState(null)
  //Returning the JSX code
  return(
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#fff"}}>
      <View style={styles.arrowWrap}>
        <MaterialIcons onPress={() => {props.navigation.popToTop()}} name="navigate-before" color="#000" size={35}/>
      </View>
      <Text style={{fontSize: 36, fontWeight: 'bold', marginBottom: 20}}>
        Hey!
      </Text>
      <Text style={{marginBottom: 30, fontWeight: '400', fontSize: 16}}>
        Let's start with the basics
      </Text>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={styles.button} onPress={async() => {
          props.navigation.navigate("info", {
            //Passing props via navigation
            gender: "male"
          })
        }}>
          <Text style={styles.buttonText}>
            MALE
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={async() => {
          props.navigation.navigate("info", {
            //Passing props via navigation
            gender: "female"
          })
        }}>
          <Text style={styles.buttonText}>
            FEMALE
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

GenderScreen.navigationOptions = () => {
  return{
    headerShown: false
  }
}

const styles = StyleSheet.create({
  button:{
    backgroundColor: Colors.buttonColor,
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 30,
    width: 160,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5
  },
  buttonText:{
    fontSize: 18,
    fontWeight: 'bold'
  },
  arrowWrap:{
    position: 'absolute',
    top: 50,
    left: 10
    // flex:1,
  },
})

//Exporting the component so that we can use it in other components
export default GenderScreen
