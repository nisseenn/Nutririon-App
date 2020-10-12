import React, { useState, useReducer, useCallback, useEffect, useRef } from 'react'
import { Platform, ScrollView, View, TextInput, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Text, Button, ActivityIndicator, Alert, Image, Dimensions } from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'
import { useDispatch } from 'react-redux'
import Input from '../components/Input'
import * as firebase from 'firebase'
import { signup } from '../store/actions/auth'
//Importing colors
import Colors from '../constants/Colors'
//import helper function getOS to allow mocking Platform.OS in Jest
import { getOS } from '../constants/helper'



//Getting height of screen
const {width,height} = Dimensions.get('window')
//Checking if andriod
const isAndroid = Platform.OS == 'android'
//Changing the behavior of the keyboard based on platform
const behavior = Platform.OS == 'android' ? "height" : "padding"
//creating a const for the reducer
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

//Defining the form reducer
const formReducer = (state, action) => {
  //Checking if the formreducer action is FORM_INPUT_UPDATE
  if (action.type === FORM_INPUT_UPDATE) {
    //If so, we want to create a js object which have the state of input values
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    //And a js object with the validity of the form
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    //we create a var which can be modified
    let updatedFormIsValid = true;
    //Go through the updatedValidities
    for (const key in updatedValidities) {
      //setting the var equal to the valus in the validity if the object
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    //returning a js obj with the updated values
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};
//Defining the component with props as parameter
const SignupScreen = (props) => {
  //Getting params from the navigation passed in prev component in stack
  const gender = props.navigation.getParam("gender")
  const userWork = props.navigation.getParam("work")
  const userFreetime = props.navigation.getParam("freetime")
  const age = props.navigation.getParam("age")
  const weight = props.navigation.getParam("weight")
  const userHeight = props.navigation.getParam("height")
  const preference = props.navigation.getParam("preference")

  //defining some state to be used to check if we are loading
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  //State for text
  const [value, onChangeText] = useState(null);
  //state if passwords are the same
  const [passCheck, setPassCheck] = useState(false)
  //to more easily use useDispatch
  const dispatch = useDispatch()
  //Defining formstate (which holds a value) and dispatch with is going to be called whenever we want
  //to change state of formstate
  //useReducer takes a reducer fuction as first argument, and then a value,
  const [formState, dispatchFormState] = useReducer(formReducer, {
   inputValues: {
    email: '',
    password: '',
    name: ''
   },
   inputValidities: {
     email: false,
     password: false,
   },
   formIsValid: false
 });

//Creating a function to create account based on inputs
//it is defined as async to be able to await certain processes then go to next line of codeß
const authHandler = async () => {
    //Checking if passcheck is false
     if(passCheck === false){
       Alert.alert('Password not the same!', error, [{text: 'Okay'}])
       return;
     }
     //Creating a var and set it to be the action signup created with redux
     let action = signup(
        formState.inputValues.email,
        formState.inputValues.password,
        formState.inputValues.name,
        gender,
        age,
        weight,
        userHeight,
        preference,
        userWork,
        userFreetime
      );
    //We set the state of error to null
    setError(null)
    //We set loading state to true
    setIsLoading(true)
    try{
      //We try dispatching the signup action with redux
     await dispatch(action);
     //We navigate in to the app
     props.navigation.navigate('Main')
   } catch (err){
     //we set error to the errormessage
     setError(err.message)
     //Setting loading state to false
     setIsLoading(false)
   }
  };

  //we check if passwords is the same with useEffect, and pass inn value as the var to useEffect
  useEffect(() => {
  if (value === formState.inputValues.password) {
    setPassCheck(true)
  }
}, [value])

//Using the useCallback function to run a function only when dispatchFormState is called
//or when inputChangeHandler is called spesifically
const inputChangeHandler = useCallback(
  (inputIdentifier, inputValue, inputValidity) => {
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: inputValue,
      isValid: inputValidity,
      input: inputIdentifier
    });
  },
  [dispatchFormState]
);

  return(
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={-200}
      style={styles.screen}>
      <LinearGradient
          colors={[Colors.primaryColor, '#ffafbd']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: height
          }}
        />
      <View style={{flex:1, justifyContent: 'flex-end'}}>

        <View style={styles.arrowWrap}>
          <MaterialIcons onPress={() => {props.navigation.navigate("preferences")}} name="navigate-before" color="white" size={35}/>
        </View>

        <View style={styles.header}>
          {/* <Text style={styles.headerText}>
            Let's create a profile
          </Text> */}
        </View>

        <View
          animation="fadeInUpBig"
          style={styles.buttonWrapper}>
          <ScrollView style={styles.form}>

          {/* <View style={{alignItems: 'center', width: '100%'}}>
            <TouchableOpacity style={styles.avatar} onPress={avatarHandler}>
              <Image source={{uri: avatar}} style={styles.img}/>
              <Ionicons
                size={40}
                color="#3c8b80"
                name="ios-add"
                style={{marginTop: 6}}
              />
            </TouchableOpacity>
          </View> */}

          <View style={styles.cont}>
            <View style={styles.titlecont}>
              <Text style={styles.inputTitle}>Name</Text>
            </View>
            <View style={styles.inputcontainer}>
              <View style={styles.iconcont}>
                <MaterialIcons name="person-outline" size={30} color={Colors.iconColor}/>
              </View>
              <Input
                id="name"
                placeholder='Full Name'
                keyboardType="default"
                required
                autoCapitalize="none"
                onInputChange={inputChangeHandler}
                initialValue=""
              />
            </View>
          </View>
          <View style={{height: height / 40}}></View>
          <View style={styles.cont}>
            <View style={styles.titlecont}>
              <Text style={styles.inputTitle}>Email</Text>
            </View>
            <View style={styles.inputcontainer}>
              <View style={styles.iconcont}>
                <MaterialIcons name="person-outline" size={30} color={Colors.iconColor}/>
              </View>
              <Input
                id="email"
                placeholder='Your email'
                containerStyle={styles.input}
                keyboardType="email-address"
                required
                email
                autoCapitalize="none"
                errorText="plase enter valid email"
                onInputChange={inputChangeHandler}
                initialValue=""
              />
            </View>
          </View>

          <View style={{height: height / 40}}></View>

          <View style={styles.cont}>
            <View style={styles.titlecont}>
              <Text style={styles.inputTitle}>Password</Text>
            </View>
            <View style={styles.inputcontainer}>
              <View style={styles.iconcont}>
                <MaterialIcons name="lock-outline" size={30} color={Colors.iconColor}/>
              </View>
              <Input
                id="password"
                placeholder='Your password'
                keyboardType="default"
                secureTextEntry
                required
                minLength={5}
                autoCapitalize="none"
                errorText="plase enter valid password"
                onInputChange={inputChangeHandler}
                initialValue=""
              />
            </View>
          </View>

          <View style={{height: height / 30}}></View>

          <View style={styles.cont}>
            <View style={styles.titlecont}>
              <Text style={styles.confirmTitle}>Confirm Password</Text>
            </View>
            <View style={styles.formControl}>
              <View style={styles.iconcont}>
                <MaterialIcons name="lock-outline" size={30} color={Colors.iconColor}/>
              </View>
              <TextInput
                placeholder='Confirm Password'
                keyboardType="default"
                secureTextEntry
                required
                minLength={5}
                autoCapitalize="none"
                errorText="plase enter valid password"
                onChangeText={(password) => onChangeText(password)}
                value={value}
                style={styles.input}
              />
            </View>
          </View>

          <View style={styles.buttonContainerTop}>
            {isLoading ? (
              <TouchableOpacity
                onPress={authHandler}
                style={{...styles.button, backgroundColor: Colors.buttonColor, flexDirection: 'row', justifyContent: 'center'}}>
                <ActivityIndicator size="small" color="white"/>
              </TouchableOpacity>
            )
            : (
            <TouchableOpacity
              onPress={authHandler}
              style={{...styles.button, backgroundColor: Colors.buttonColor, flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>Sign up</Text>
              <MaterialIcons name="navigate-next" size={26} color="black"/>
            </TouchableOpacity>
            )}
          </View>
          <View style={{height: height / 50}}></View>
          {/* <View style={styles.buttonContainer}>
            <Button
            title='Log in'
            color="#e56767"
            onPress={() => {
              props.navigation.navigate("login")
            }}/>
          </View> */}
        </ScrollView>
        </View>
      </View>
     </KeyboardAvoidingView>
  )
}

SignupScreen.navigationOptions = () => {
  return {
    headerShown: false
  }
}

const styles = StyleSheet.create({
  screen: {
    height: '100%'
  },
  arrowWrap:{
    position: 'absolute',
    top: 50,
    left: 10
    // flex:1,
  },
  cont:{
    flex:1,
    flexDirection: 'column',
  },
  header:{
    marginBottom: height / 30,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 15,
  },
  headerText:{
    fontSize: 30,
    color: "white",
    fontWeight: 'bold',
  },
  inputcontainer:{
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  formControl:{
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  inputTitle:{
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.iconColor,
    top: 15,
  },
  avatar:{
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E1E2E6",
    justifyContent: 'center',
    alignItems: 'center'
  },
  img:{
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50
  },
  confirmTitle:{
    marginVertical: 8,
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.iconColor,
  },
  iconcont:{
    flexDirection: 'column',
    paddingRight: 10
  },
  buttonWrapper:{
    height: height / 1.15,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    opacity: 1,
    paddingVertical: 35,
    paddingHorizontal: 20
  },
  button:{
    backgroundColor: 'white',
    // height: 60,
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 45
  },
  input:{
    width: '100%',
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  }
})

export default SignupScreen
