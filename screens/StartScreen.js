import React, { useState, useReducer, useCallback, useEffect, useRef } from 'react'
import { ScrollView, View, StyleSheet, StatusBar, KeyboardAvoidingView, TouchableOpacity, Text, Button, ActivityIndicator, Alert, Image, Dimensions } from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'
//Getting the width and height of the screen
const {width,height} = Dimensions.get('window')
//Creating a var for the logo based on the height of screen
const height_logo = height * 0.6 * 0.4
import Svg, { Path } from 'react-native-svg';

import Colors from '../constants/Colors'


const StartScreen = (props) => {

  const frontimage = require('../assets/startimg.jpg')

  return(
    <View style={{flex:1, justifyContent: 'flex-start'}}>
        <View style={{flex:1, backgroundColor: 'white', justifyContent: 'flex-end'}}>
          <View style={styles.header}>
            <Text
              style={styles.headerText}>
              Track your dietary intake
            </Text>
          </View>
            <View style={{position: 'absolute',top: 120 ,bottom: 0,left: 0,right: 0, width: width, height: 200}}>
                <Image
                  source={frontimage}
                  style={styles.bgImg}
                />
            </View>
            <View style={{position: 'absolute', top: -50, width: width}}>
              <View
                style={{position: 'absolute', top: height - 250, height: 300, width: width, backgroundColor: '#69a1ff'}}>
              </View>
              <View
                style={{position: 'absolute', zIndex: 100, top: height - 165, height: 300, width: width, backgroundColor: Colors.primaryColor}}>
              </View>
              <Svg
                style={{position: 'absolute', bottom: 0, zIndex: 1000}}
                height="100%"
                width="100%"
                viewBox="0 0 1440 320">
              </Svg>
              <Svg
                style={{position: 'absolute', top: height - 339, zIndex: 1000}}
                height="100%"
                width="100%"
                viewBox="0 0 1440 320">
                <Path
                  fill={Colors.primaryColor}
                  d="M0,32L60,64C120,96,240,160,360,208C480,256,600,288,720,256C840,224,960,128,1080,80C1200,32,1320,32,1380,32L1440,32L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                  />
              </Svg>
              <Svg
                style={{position: 'absolute', opacity: 1, top: height - 320, zIndex: 1000}}
                height="100%"
                width="100%"
                viewBox="0 0 1440 320">
                <Path
                  fill="#ffb944"
                  d="M0,128L60,160C120,192,240,256,360,245.3C480,235,600,149,720,122.7C840,96,960,128,1080,160C1200,192,1320,224,1380,240L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                  />
              </Svg>
              <Svg
                style={{position: 'absolute', opacity: 1, top: height - 300, zIndex: 1000}}
                height="100%"
                width="100%"
                viewBox="0 0 1440 320">
                <Path
                  fill="#69a1ff"
                  d="M0,128L80,133.3C160,139,320,149,480,176C640,203,800,245,960,245.3C1120,245,1280,203,1360,181.3L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
                  />
              </Svg>
              <Svg
                style={{position: 'absolute', opacity: 1, top: height - 252, zIndex: 1000}}
                height="100%"
                width="100%"
                viewBox="0 0 1440 320">
                <Path
                  fill={Colors.primaryColor}
                  d="M0,96L60,90.7C120,85,240,75,360,101.3C480,128,600,192,720,202.7C840,213,960,171,1080,165.3C1200,160,1320,192,1380,208L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                  />
              </Svg>
                <Ionicons
                  style={{ opacity: 0 }}
                  name="ios-quote" size={90} color="#fff"/>
              </View>

          <View
            // animation="fadeInUpBig"
            style={styles.buttonWrapper}>
            {/* <Text style={styles.titleText}>Keep track of your dietary intake</Text> */}
            {/* <View > */}
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("login")
                }}
                style={{...styles.button, backgroundColor: Colors.buttonColor, flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>Log in</Text>
                <MaterialIcons name="navigate-next" size={26} color="black"/>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("signup")
                }}
                style={{...styles.button, borderWidth: 2,backgroundColor: 'rgba(229,	103,	103, 0)', borderColor: Colors.buttonColor, flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{fontSize: 20, fontWeight: '500', color: '#fff'}}>Sign up</Text>
                <MaterialIcons name="navigate-next" size={26} color="#fff"/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
    // </View>
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
logo:{
  width: height_logo,
  height: height_logo,
  borderRadius: height_logo / 2,
},
  buttonWrapper:{
    height: height / 2,
    justifyContent: 'center',
    // backgroundColor: 'white',
    // borderTopLeftRadius: -30,
    // borderTopRightRadius: -30,
    paddingTop: 150,
    opacity: 1,
  },
  titleText:{
    fontSize: 26,
    fontWeight: 'bold',
    color: '#198599',
    marginHorizontal: 30,
    marginBottom: 25
  },
  header:{
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 20,
  // backgroundColor: 'red'
},
  headerText:{
    fontSize: 30,
    color: "black",
    fontWeight: 'bold',
    opacity: .7
  },
  bgImg:{
    flex:1,
    height: null,
    width: null
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
