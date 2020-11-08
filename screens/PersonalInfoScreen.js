//Importing the react native and react components
import React, { useState, useReducer, useCallback, useEffect, useRef } from 'react'
import { ScrollView, View, TextInput, Keyboard, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Text, Button, ActivityIndicator, Alert, Image, Dimensions } from 'react-native'
import COLORS from '../constants/Colors'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const {width,height} = Dimensions.get('window')
//Defining HomeScreen functional component
const PersonalInfoScreen = (props) => {
  //Getting the gender, userwork and free time activity the user pressed
  const gender = props.navigation.getParam("gender")
  const userWork = props.navigation.getParam("work")
  const userFreetime = props.navigation.getParam("freetime")

  const [age, setAge] = useState(null)
  const [userHeight, setHeight] = useState(null)
  const [weight, setWeight] = useState(null)
  //State for the labeltext to slide in
  const [firstFocus, setFirstFocus] = useState(false)
  const [secondFocus, setSecondFocus] = useState(false)
  const [thirdFocus, setThirdFocus] = useState(false)
  //Creating a ref to the inputs so we can
  //go to this when pressing done on first input
  const secondInput = useRef(null)
  const thirdInput = useRef(null)
  //Returning the JSX code
  return(
    <KeyboardAvoidingView
      behavior="padding"
      // keyboardVerticalOffset={-200}
      style={styles.screen}>
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#fff"}}>

      <View style={styles.arrowWrap}>
        <MaterialIcons onPress={() => {props.navigation.navigate("gender")}} name="navigate-before" color="#000" size={35}/>
      </View>

      <View style={{paddingBottom: 40, maxWidth: width / 1.3}}>
        <Text style={{fontSize: 26, fontWeight: 'bold', textAlign: 'center'}}>
          Tell us a little about your self
        </Text>
      </View>

      <View style={{width: '80%',alignItems: 'center'}}>
      {/* rendering the labeltext once the textinput is focused */}
      {firstFocus ? (
        <Animatable.View
          animation="slideInLeft"
          duration={200}
          useNativeDriver
          style={{position: 'absolute', width: '100%', overflow: 'hidden'}}>
          <Text style={styles.title}>
            Your age
          </Text>
        </Animatable.View>
      ) : (
        <View>

        </View>
      )}

      <TextInput
       style = {styles.input}
       onChangeText={text => {
         setFirstFocus(true)
         setAge(text)
       }}
       selectionColor = {COLORS.buttonColor}
       maxLength={60}
       returnKeyType="done"
       placeholder="Your age"
       // onFocus={() => setFirstFocus(true)}
       //Going to the second input when pressing done
       onSubmitEditing={() => secondInput.current.focus()}
       textAlign="left"
       keyboardType="number-pad"
     />
      </View>

      <View style={{width: '80%',alignItems: 'center'}}>

        {secondFocus ? (
          <Animatable.View
            animation="slideInLeft"
            duration={200}
            useNativeDriver
            style={{position: 'absolute', width: '100%', overflow: 'hidden'}}>
            <Text style={styles.title}>
              Your height (cm)
            </Text>
          </Animatable.View>
        ) : (
          <View>

          </View>
        )}

     <TextInput
      style = {styles.input}
      onChangeText={text => {
        setSecondFocus(true)
        setHeight(text)
      }}
      selectionColor = {COLORS.buttonColor}
      maxLength={60}
      returnKeyType="done"
      placeholder="Your height (cm)"
      //Going to the third input when pressing done
      onSubmitEditing={() => thirdInput.current.focus()}
      textAlign="left"
      keyboardType="number-pad"
      //Creating a ref which is uniqe to this input
      ref={secondInput}
    />
    </View>

    <View style={{width: '80%',alignItems: 'center'}}>

      {thirdFocus ? (
        <Animatable.View
          animation="slideInLeft"
          duration={200}
          useNativeDriver
          style={{position: 'absolute', width: '100%', overflow: 'hidden'}}>
          <Text style={styles.title}>
            Your weight (kg)
          </Text>
        </Animatable.View>
      ) : (
        <View>

        </View>
      )}

    <TextInput
     style = {styles.input}
     onChangeText={text => {
       setThirdFocus(true)
       setWeight(text)
     }}
     selectionColor = {COLORS.buttonColor}
     maxLength={60}
     returnKeyType="done"
     placeholder="Your weight (kg)"
     onSubmitEditing={Keyboard.dismiss}
     textAlign="left"
     keyboardType="number-pad"
     //Creating a ref which is uniqe to this input
     ref={thirdInput}
   />
  </View>
    </View>
  <View style={styles.bottomButtonWrap}>
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate("preferences", {
          gender: gender,
          work: userWork,
          freetime: userFreetime,
          age: age,
          height: userHeight,
          weight: weight
        })
      }}
      style={styles.buttonBottom}>
      <Text style={{fontWeight: 'bold', fontSize: 16}}>
        NEXT
      </Text>
    </TouchableOpacity>
  </View>
  </KeyboardAvoidingView>
  )
}

PersonalInfoScreen.navigationOptions = () => {
  return{
    headerShown: false
  }
}

const styles = StyleSheet.create({
  screen:{
    height: '100%'
  },
  button:{
    backgroundColor: COLORS.buttonColor,
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
  input: {
   width: '100%',
   height: 40,
   fontSize: 24,
   textAlign: 'left',
   borderColor: COLORS.buttonColor,
   borderBottomWidth: 1.5,
   color:"black",
   marginVertical: 20,
  },
  title:{
    fontSize: 14,
    fontWeight: '400',
    opacity: .7
  },
  bottomButtonWrap:{
    position: 'absolute',
    bottom: 100,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonBottom:{
    backgroundColor: COLORS.buttonColor,
    paddingHorizontal: width / 3,
    paddingVertical: 15,
    borderRadius: 100
  }
})

//Exporting the component so that we can use it in other components
export default PersonalInfoScreen
