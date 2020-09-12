import React, { useState, useReducer, useCallback, useEffect, useRef } from 'react'
import { ScrollView, View, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Text, Button, ActivityIndicator, Alert, Image, Dimensions } from 'react-native'
import { useDispatch } from 'react-redux'
import firebase from 'firebase';
import { login } from '../store/actions/auth'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
//Importing the colors we are going to use
import Colors from '../constants/Colors'
//Importing our customized, amazing component, which can be used in multiple other components
import Input from '../components/Input'

//Checking if the phone is andriod
const isAndroid = Platform.OS == 'android'

//Defining how keyboard should influence screen based on platform
const behavior = Platform.OS == 'android' ? "height" : "padding"

//Creating a const to use is reducer
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const {width,height} = Dimensions.get('window')
//Creating the reducer taking the state and action as parameters
//This reducer will handle the form input
const formReducer = (state, action) => {
  //Checking if the action type is FORM_INPUT_UPDATE
  if (action.type === FORM_INPUT_UPDATE) {
    //Creating a  javascript object holding the state, and the action input value key value pair which is dynamically set up
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    //Creating a javascript object which is holding state of inputValidities
    //and a key value pair for the action isvalid
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    //Looping through the updatedValidities
    for (const key in updatedValidities) {
      //Setting the variable determining whether the form is valid to a new value
      //based on the updatedFormIsValid elements
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    //Returning the javascript object with the new values
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

//Creating the component with props as parameters
const LoginScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  //Defining dispatch to more easily write dispatch code
  const dispatch = useDispatch()
  //Defining formstate (which holds a value) and dispatch with is going to be called whenever we want
  //to change state of formstate
  //useReducer takes a reducer fuction as first argument, and then a value,
  const [formState, dispatchFormState] = useReducer(formReducer, {
   inputValues: {
    email: '',
    password: ''
   },
   inputValidities: {
     email: false,
     password: false
   },
   formIsValid: false
  });

  const authHandler = async () => {
     let action = login(
        formState.inputValues.email,
        formState.inputValues.password
      );

    setError(null)
    setIsLoading(true)
    try{
     await dispatch(action);

     props.navigation.navigate("Main", {
       // email: formState.inputValues.email,
       // verfiedProp: true
     })
   } catch (err){
     setError(err.message)
     setIsLoading(false)
   }
  };

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

  //Added message to user if something fails on login
  useEffect(() => {
    if(error){
      Alert.alert('An error occured', error, [{text: 'Okay'}])
    }
  }, [error])

  return(
    <KeyboardAvoidingView
      behavior={behavior}
      keyboardVerticalOffset={-200}
      style={styles.screen}>
      <LinearGradient
          colors={[Colors.primaryColor, '#70ffe1']}
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
          <MaterialIcons onPress={() => {props.navigation.navigate("start")}} name="navigate-before" color="white" size={35}/>
        </View>
        <View style={styles.header}>
          <Text
            style={styles.headerText}>
            Let's sign you in
          </Text>
        </View>

        <View
          // useNativeDriver={true}

          style={styles.buttonWrapper}>
          <ScrollView style={styles.form}>
          <Text style={styles.inputTitle}>Email</Text>
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

          <View style={{height: height / 25}}></View>

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
              <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Log in</Text>
              <MaterialIcons name="navigate-next" size={26} color="white"/>
            </TouchableOpacity>
            )}
          </View>
          <View style={{height: height / 50}}></View>
          <View style={styles.buttonContainer}>
            {isAndroid ? (
              <View>
                <TouchableOpacity
                  style={{
                    ...styles.button2, borderColor: Colors.buttonColor, borderWidth: 1, flexDirection: 'row', justifyContent: 'center'
                  }}
                  onPress={() => {
                    props.navigation.navigate("signup")
                  }}>
                  <Text style={{fontSize: 20, fontWeight: 'bold', color: Colors.buttonColor}}>
                    Sign up
                  </Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                  style={{
                    ...styles.button2, borderColor: '#e56767', borderWidth: 1, flexDirection: 'row', justifyContent: 'center'
                  }}
                  onPress={() => {

                  }}>
                  <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
                    Forgot password?
                  </Text>
                </TouchableOpacity> */}
              </View>
            ) : (
              <View>
                <Button
                title='Sign Up'
                color={Colors.iconColor}
                onPress={() => {
                  props.navigation.navigate("signup")
                }}/>
                {/* <View style={{marginTop: height / 50}}>
                  <Button
                  title='Forgot password?'
                  color="#e56767"
                  onPress={() => {

                  }}/>
                </View> */}
              </View>
            )}
          </View>

          {/* {emailAnimation ? (
            <View style={{flex:1, width: '100%', height: '100%',justifyContent: 'center', alignItems: 'center', position: 'absolute', zIndex: 7000}}>
              <View
                style={{backgroundColor: "#80d0c7", width: width / 2, height: width / 2, borderRadius: 30, justifyContent: 'center', alignItems: 'center'}}
                ref={imageRef}
                >
                <Text style={{color:"#fff", fontWeight: '600', fontSize: 20}}>Email sent</Text>
                <Text style={{color:"#fff", fontWeight: '600', fontSize: 16, marginTop: 5, marginBottom: 5}}>Check junk mail</Text>
                <MaterialIcons name="check" size={50} color="#fff"/>
              </View>
            </View>
          ) : (
            <View>

            </View>
          )} */}

        </ScrollView>
        </View>
      </View>
     </KeyboardAvoidingView>
  )
}

LoginScreen.navigationOptions = () => {
  return{
    headerShown: false
  }
}

const styles = StyleSheet.create({
  screen: {
    height: '100%'
  },
  arrowWrap:{
    top: height / 20,
    flex:1,
  },
  header:{
  marginBottom: height / 13,
  paddingHorizontal: 15,
},
headerText:{
  fontSize: 30,
  color: "white",
  fontWeight: 'bold',
},
  cont:{
    flex:1,
    flexDirection: 'column',
  },
  inputcontainer:{
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  inputTitle:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#093170',
    top: 15
  },
  button:{
    backgroundColor: 'white',
    height: 60,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 45
  },
  buttonWrapper:{
  height: height / 1.4,
  justifyContent: 'center',
  backgroundColor: 'white',
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  opacity: 1,
  paddingVertical: 35,
  paddingHorizontal: 20
},
  input: {
   width: '100%',
   height: 40,
   fontSize: 18,
   textAlign: 'left',
   borderColor: '#d9d9d9',
   borderBottomWidth: 1,
   color:"black"
  },
})

export default LoginScreen
