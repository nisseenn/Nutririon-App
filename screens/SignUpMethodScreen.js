import React, { useState, useReducer, useCallback, useEffect, useRef } from 'react'
import { ScrollView, View, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Text, Button, ActivityIndicator, Alert, Image, Dimensions } from 'react-native'
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import Colors from '../constants/Colors'

const {width,height} = Dimensions.get('window')

const SignUpMethodScreen = (props) => {
  //Getting params from the navigation passed in prev component in stack
  const gender = props.navigation.getParam("gender")
  const age = props.navigation.getParam("age")
  const weight = props.navigation.getParam("weight")
  const userHeight = props.navigation.getParam("height")
  const preference = props.navigation.getParam("preference")

  return(
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}>

      <View style={styles.arrowWrap}>
        <MaterialIcons onPress={() => {props.navigation.navigate("preferences")}} name="navigate-before" color="#000" size={35}/>
      </View>

      <View style={{paddingBottom: 40, maxWidth: width / 1.2}}>
        <Text style={{fontSize: 26, fontWeight: 'bold', textAlign: 'center'}}>
          How would you like to sign in?
        </Text>
      </View>

      <View style={styles.bottomButtonWrap}>
        <TouchableOpacity
          onPress={async () => {
            //HANDLE SOME LOGIN WITH APPLE

            //Passing props via navigation
            props.navigation.navigate("start", {
              gender: gender,
              age: age,
              height: userHeight,
              weight: weight,
              preference: preference
            })
          }}
          style={{...styles.buttonBottom, backgroundColor: '#000'}}>
          <FontAwesome
            name="apple"
            color="#fff"
            style={{position: 'absolute', left: 30}}
            size={20}/>
          <Text style={{fontWeight: 'bold', fontSize: 18, color: "#fff"}}>
            LOG IN WITH APPLE
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomButtonWrap}>
        <TouchableOpacity
          onPress={async () => {
            //HANDLE SOME LOGIN WITH FACEBOOK

            //Passing props via navigation
            props.navigation.navigate("start", {
              gender: gender,
              age: age,
              height: userHeight,
              weight: weight,
              preference: preference
            })
          }}
          style={{...styles.buttonBottom, backgroundColor: Colors.primaryColor}}>
          <FontAwesome
            name="facebook"
            color="#fff"
            style={{position: 'absolute', left: 30}}
            size={20}/>
          <Text style={{fontWeight: 'bold', fontSize: 18, color: "#fff"}}>
            LOG IN WITH FACEBOOK
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomButtonWrap}>
        <TouchableOpacity
          onPress={() => {
            //Passing props via navigation
            props.navigation.navigate("start", {
              gender: gender,
              age: age,
              height: userHeight,
              weight: weight,
              preference: preference
            })
          }}
          style={styles.buttonBottom}>
          <Ionicons
            name="ios-mail"
            color="#000"
            style={{position: 'absolute', left: 30}}
            size={26}/>
          <Text style={{fontWeight: 'bold', fontSize: 18, color: "#000"}}>
            LOG IN WITH EMAIL
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

SignUpMethodScreen.navigationOptions = () => {
  return {
    headerShown: false
  }
}

const styles = StyleSheet.create({
  arrowWrap:{
    position: 'absolute',
    top: 50,
    left: 10
    // flex:1,
  },
  bottomButtonWrap:{
    width: '100%',
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonBottom:{
    justifyContent: 'flex-start',
    paddingLeft: 70,
    alignItems: 'center',
    backgroundColor: Colors.buttonColor,
    flexDirection: 'row',
    // paddingHorizontal: width / 3,
    width: width / 1.2,
    paddingVertical: 15,
    borderRadius: 100
  }
})

export default SignUpMethodScreen
