import React, { useState, useReducer, useCallback, useEffect, useRef } from 'react'
import { ScrollView, View, StyleSheet, StatusBar, KeyboardAvoidingView, TouchableOpacity, Text, Button, ActivityIndicator, Alert, Image, Dimensions } from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
//Getting the width and height of the screen
const {width,height} = Dimensions.get('window')
//Creating a var for the logo based on the height of screen
const height_logo = height * 0.6 * 0.4

const StartScreen = (props) => {
  return(
    <View style={{flex:1, backgroundColor: 'white', justifyContent: 'flex-start'}}>
        <View style={{flex:1, backgroundColor: 'white', justifyContent: 'flex-end'}}>
            <View style={{position: 'absolute',top: 0,bottom: 0,left: 0,right: 0, backgroundColor: 'red'}}>
              {/* <Image
                source={require('../assets/appstore.png')}
                style={styles.bgImg}
              /> */}
            </View>
            <View style={styles.header}>
              {/* <Image
                source={require('../assets/appstore.png')}
                style={styles.logo}
                resizeMode={"stretch"}
                animation="bounceIn"
                duration={1500}
              /> */}
            </View>
          <View
            // animation="fadeInUpBig"
            style={styles.buttonWrapper}>
            <Text style={styles.titleText}>Keep track of your dietary intake</Text>
            {/* <View > */}
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("login")
                }}
                style={{...styles.button, backgroundColor: '#22b2cc', flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Log in</Text>
                <MaterialIcons name="navigate-next" size={26} color="white"/>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("signup")
                }}
                style={{...styles.button, borderWidth: 2,backgroundColor: 'rgba(229,	103,	103, 0)', borderColor: '#22b2cc', flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{fontSize: 20, fontWeight: '500', color: 'black'}}>Sign up</Text>
                <MaterialIcons name="navigate-next" size={26} color="black"/>
              </TouchableOpacity>
            {/* </View> */}
          </View>
        </View>
    </View>
  )
}

//Some navigationoptions
StartScreen.navigationOptions = () => {
  return {
    //Hiding the default UGLY header
    headerShown: false
  }
}

const styles = StyleSheet.create({
  header:{
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: height / 5
},
logo:{
  width: height_logo,
  height: height_logo,
  borderRadius: height_logo / 2,
},
  buttonWrapper:{
    height: height / 2,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    opacity: 1,
  },
  titleText:{
    fontSize: 26,
    fontWeight: 'bold',
    color: '#198599',
    marginHorizontal: 30,
    marginBottom: 25
  },
  button:{
    backgroundColor: 'white',
    height: 60,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
})

export default StartScreen
