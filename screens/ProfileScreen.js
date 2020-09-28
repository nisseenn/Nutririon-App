import React, { useState, useReducer, useCallback, useEffect, useRef } from 'react'
import { ScrollView, View, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Text, Button, ActivityIndicator, Alert, Image, Dimensions } from 'react-native'
import { AsyncStorage } from 'react-native'

import { logout } from '../store/actions/auth'
import { editPreference } from '../store/actions/auth'
import { fetchIngredients } from '../store/actions/nutrition'

import { useDispatch, useSelector } from 'react-redux'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'
import firebase from 'firebase';
import * as Animatable from 'react-native-animatable';
import Animated from 'react-native-reanimated';
import { RadioButton, Checkbox } from 'react-native-paper';
import Slider from '@react-native-community/slider';


import Colors from '../constants/Colors'

const {width,height} = Dimensions.get('window')
//making it cleaner to use firebase.database code
var database = firebase.database();

const ProfileScreen = (props) => {

  const [displayName, setDisplayName] = useState(null)

  //state for the modal to pop up when pressing change preferences
  const [toggleDrop, setToggleDrop] = useState(false)
  //state for modal to pop up when pressing change activity details
  const [toggleActivity, setToggleActivity] = useState(false)
  //State to handle modal animation
  const [animation, setAnimation] = useState("fadeInUpBig")
  const [isLoading, setIsLoading] = useState(false)
  const [saveLoad, setSaveLoad] = useState(false)
  //For the single choice
  const [checked, setChecked] = useState(null);
  //For the activity details
  const [work, setWork] = useState(null)
  const [freetime, setFreetime] = useState(null)


  const dispatch = useDispatch()
  //Getting the Redux state for the preference, work and freetime
  //the "auth" is connected to out App.js file, where we define the Redux Reducer key value
  const userPreference = useSelector(state => state.auth.preference)
  const userWork = useSelector(state => state.auth.work)
  const userFreetime = useSelector(state => state.auth.freetime)

  //Function to handle submit of preferences
  const submitHandler = async() => {
    try {
      setSaveLoad(true)
      let objectReturn = await editPreference(checked, userWork, userFreetime)
      await dispatch(objectReturn)
      await dispatch(fetchIngredients())
      setSaveLoad(false)
      setToggleDrop(false)
    } catch (err) {
      // setError(err.message)
    }
  }
  //Creating a funciton to delete the preferences
  const deletePreferenceHandler = async() => {
    try {
      //Calling Redux function to handle edit of the preference.
      //We pass null as the parameter for preference. It will therefore be deleted in Firebase
      let objectReturn = await editPreference(null, userWork, userFreetime)
      //Dispatching the obj from redux function to redux state
      await dispatch(objectReturn)
    } catch (error) {

    }
  }

  //Function to handle change of activity from user
  const submitActivityHandler = async() => {
    try{
      //Setting state for the loader to work
      setSaveLoad(true)
      //Calling Redux funtion to handle the edit of preference in acitivity
      let objectReturn = await editPreference(userPreference, work, freetime)
      //Dispatching the Object which is created in Redux. Dispatching it to the Redux store
      await dispatch(objectReturn)
      //Setting the loading to false
      setSaveLoad(false)
      setToggleActivity(false)
    }catch (err){

    }
  }
  //Getting the info before component is rendered
  useEffect(() => {
    const getDisplayName = async () => {
      //Getting the info from HD on phone
      const userData = await AsyncStorage.getItem('userData');
      //Parsing the data to be able to read it
      const transformedData = JSON.parse(userData);
      //Getting data from HD
      const { token, userId, displayName } = transformedData;
      //Doing some basic JS to get first characters of the name
      const displayArray = displayName.split(' ')
      //Defining vars to hold the char values
      let firstChar;
      let secondChar;
      let displayNameShort;
      //If user only put in surname
      if(displayArray.length < 2){
        firstChar = displayArray[0].slice(0,1)
        displayNameShort = firstChar.toUpperCase()
      //If user puts in surname and given name
      }else{
        firstChar = displayArray[0].slice(0,1)
        secondChar = displayArray[1].slice(0,1)
        displayNameShort = firstChar.toUpperCase() + secondChar.toUpperCase()
      }
      //Setting the characters to state variable
      setDisplayName(displayNameShort)
    };
  getDisplayName()
  }, [dispatch])

  //Function to dele user from Realtime DB and authentication
  //Need to update the message as user puts more data in RTDB
  const deleteHandler = async () => {
    //Setting loading to true
    setIsLoading(true)
    //Getting user from Firebase
    const user = await firebase.auth().currentUser
    //Creating a new Obj to delete shit on RTDB
    let message = {
      age: null,
      gender: null,
      preference: null,
      userHeight: null,
      weight: null,
      freetime: null,
      work: null
    }
    //Updating RTDB with the new message, using userId ofc
    firebase.database().ref('users').child(user.uid).update(message)
    //Calling Redux logout function we created
    dispatch(logout())
    //Calling the Firebase function to delete user from the Authentication
    await user.delete()
    //Navigating to Auth ofc
    props.navigation.navigate('Auth')
    //Setting loading to false
    setIsLoading(false)
  }

  return(
    <View style={styles.container}>

        <View style={{zIndex: 1000, position: 'absolute', width: '100%', justifyContent: 'center', alignItems: 'center', top: 100}}>
          <View style={{zIndex: 1000, backgroundColor: Colors.accentColor, width: width / 3, height: width / 3, borderRadius: 300, alignItems: 'center', justifyContent: 'center'}}>
            <Text
              style={styles.settingsText}>
              {/* Displaying our beautiful character(s) */}
              {displayName}
            </Text>
          </View>
        </View>

      <View style={styles.backgroundTop}>
        <LinearGradient
            colors={[Colors.primaryColor, Colors.accentColor]}
            style={{
              // flex:1,
              height: height / 3
            }}
          />
      </View>
  {/* OBJECT DESTRUCTURING, GETTING ALL STYLES FROM PREFERENCES AND ADDING BOTTOM */}
  <View style={{...styles.preferences, bottom: 340}}>
    <TouchableOpacity
      onPress={async() => {
        //Setting the state to the userPreference, so that it is checked when user loads modal
        setChecked(userPreference)
        //Setting state of toggleDrop to true to activate the modal pop up
        setToggleDrop(true)
      }}
      style={styles.preferencesButton}>
      <Text style={{fontSize: 16, fontWeight: 'bold'}}>
        CHANGE PREFERENCES
      </Text>
      <MaterialIcons name="navigate-next" size={26} color="#000"/>
    </TouchableOpacity>
  </View>

  <View style={{...styles.preferences, bottom: 270}}>
    <TouchableOpacity
      onPress={() => {
        //Setting state of work and userFreetime to info got from Redux so user gets info on modal pop up
        setWork(userWork)
        setFreetime(userFreetime)
        //Activating the modal pop up
        setToggleActivity(true)
      }}
      style={styles.preferencesButton}>
      <Text style={{fontSize: 16, fontWeight: 'bold'}}>
        CHANGE ACTIVITY DETAILS
      </Text>
      <MaterialIcons name="navigate-next" size={26} color="#000"/>
    </TouchableOpacity>
  </View>

  <View style={styles.preferences}>
    <TouchableOpacity style={styles.preferencesButton}>
      <Text style={{fontSize: 16, fontWeight: 'bold'}}>
        VIEW PRIVACY POLICY
      </Text>
      <MaterialIcons name="navigate-next" size={26} color="#000"/>
    </TouchableOpacity>
  </View>

  <View style={{...styles.preferences, bottom: 130}}>
    <TouchableOpacity
      onPress={() => {
        // Asking user if they are sure to log out
        Alert.alert(
        'Are you sure you want to log out?',
        '',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },
          {
            text: 'Yes',
            onPress: () => {
              //If so..
              //Dispatch to redux to call logout function
              dispatch(logout())
              //Navigating to startscreen
              props.navigation.navigate('Auth')
            }
          },
        ],
        { cancelable: true }
        );

      }}
      style={{...styles.preferencesButton, backgroundColor: Colors.buttonColor}}>
      <Text style={{fontSize: 16, fontWeight: 'bold'}}>
        LOG OUT
      </Text>
      <MaterialIcons name="navigate-next" size={26} color="#000"/>
    </TouchableOpacity>
  </View>

  <View style={{...styles.preferences, bottom: 60}}>
    <TouchableOpacity
      onPress={() => {
        //Asking user to verify deleting account
        Alert.alert(
        'Are you sure you want to delete your account?',
        'All data about you will be deleted',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },
          {
            text: 'Yes',
            onPress: () => deleteHandler()
          },
        ],
        { cancelable: true }
        );
      }}
      style={{...styles.preferencesButton, backgroundColor: '#ff5656'}}>
      <Text style={{fontSize: 16, fontWeight: 'bold'}}>
        DELETE ACCOUNT
      </Text>
      <MaterialIcons name="navigate-next" size={26} color="#000"/>
    </TouchableOpacity>
  </View>

{/* If toggleDrop is true, show this */}
  {toggleDrop ? (
    <Animatable.View
      useNativeDriver
      duration={200}
      animation={animation}
      style={styles.modal}>

    <Animatable.View
      style={{width: '100%', justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 20}}>
      <View style={styles.boxWrap}>
        <View style={styles.textWrap}>
          <Text style={styles.boxText}>
            Vegeterian
          </Text>
        </View>

        <View style={{borderWidth: 1, borderRadius: 100, borderColor: "#000", position: 'absolute', right: 0}}>
          <RadioButton
            value="vegeterianer"
            status={ checked === 'vegeterianer' ? 'checked' : 'unchecked' }
            color={Colors.primaryColor}
            onPress={() => setChecked('vegeterianer')}
          />
        </View>
      </View>

      <View style={styles.boxWrap}>
        <View style={styles.textWrap}>
          <Text style={styles.boxText}>
            Vegan
          </Text>
        </View>

        <View style={{borderWidth: 1, borderRadius: 100, borderColor: "#000", position: 'absolute', right: 0}}>
          <RadioButton
            value="vegan"
            status={ checked === 'vegan' ? 'checked' : 'unchecked' }
            color={Colors.primaryColor}
            onPress={() => setChecked('vegan')}
          />
        </View>
      </View>

      <View style={styles.boxWrap}>
        <View style={styles.textWrap}>
          <Text style={styles.boxText}>
            Pescetarian
          </Text>
        </View>

        <View style={{borderWidth: 1, borderRadius: 100, borderColor: "#000", position: 'absolute', right: 0}}>
          <RadioButton
            value="pesc"
            status={ checked === 'pesc' ? 'checked' : 'unchecked' }
            color={Colors.primaryColor}
            onPress={() => setChecked('pesc')}
          />
        </View>
      </View>

      <View style={{height: 10}}>
      </View>
        {saveLoad ? (
          <TouchableOpacity
            onPress={submitHandler}
            style={{...styles.modalButton, borderWidth: 0, backgroundColor: Colors.buttonColor}}>
          <ActivityIndicator size="small" color="black"/>
        </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={submitHandler}
            style={{...styles.modalButton, borderWidth: 0, backgroundColor: Colors.buttonColor}}>
            <Text style={{fontSize: 16, fontWeight: '700', color: "black"}}>
              SAVE
            </Text>
          </TouchableOpacity>
        )}

      <TouchableOpacity
        onPress={() => setToggleDrop(false)}
        style={styles.modalButton}>
        <Text style={{fontSize: 16, fontWeight: '700'}}>
          CANCEL
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          Alert.alert(
          'Are you sure you want to delete preferences?',
          '',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel'
            },
            {
              text: 'Yes',
              onPress: () => {
                deletePreferenceHandler()
              }
            },
          ],
          { cancelable: true }
          );
        }}
        style={{marginBottom: 10, marginTop: 20}}>
        <Text style={{fontWeight: 'bold', color: "#da2626" }}>
          Delete preferences
        </Text>
      </TouchableOpacity>

    </Animatable.View>
  </Animatable.View>
  ) : (
    <View>

    </View>
  )}

{/* If activittoggle is true, show this*/}
  {toggleActivity ? (
    <Animatable.View
      useNativeDriver
      duration={200}
      animation={animation}
      style={styles.modal}>

    <Animatable.View
      style={{width: '100%', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 20}}>

      <Text style={{marginBottom: 5, fontWeight: 'bold', fontSize: 20}}>
        Level of activity at work
      </Text>

      <View style={[{}]} >

                {/*Slider with max, min, step and initial value*/}
        <Slider
          maximumValue={4}
          minimumValue={0}
          thumbTintColor={Colors.primaryColor}
          minimumTrackTintColor= {Colors.accentColor}
          maximumTrackTintColor="#000000"
          minimumValueLabel="Never"
          maximumValueLabel="Always"
          step={1}
          value={work}
          onValueChange={(work) =>  setWork(work)}
          style={{ width: 300, height: 50, marginBottom: 20 }}
        />

      </View>

      <Text style={{marginTop: 30, fontWeight: 'bold', fontSize: 20}}>
        Level of activity in freetime
      </Text>

      <View style={[{}]} >

                {/*Slider with max, min, step and initial value*/}
        <Slider
          maximumValue={4}
          minimumValue={0}
          thumbTintColor={Colors.primaryColor}
          minimumTrackTintColor= {Colors.accentColor}
          maximumTrackTintColor="#000000"
          minimumValueLabel="Never"
          maximumValueLabel="Always"
          step={1}
          value={freetime}
          onValueChange={(freetime) =>  setFreetime(freetime)}
          style={{width: 300, height: 50, marginBottom: 20 }}
        />

      </View>

      <View style={{width: '100%', flexDirection: 'row', marginTop: 30, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => setToggleActivity(false)}
          style={styles.modalButton2}>
          <Text style={{fontSize: 16, fontWeight: '700'}}>
            CANCEL
          </Text>
        </TouchableOpacity>
        {/* IF save button is pressed, ActivityIndicator will replace the text */}
        {saveLoad ? (
          <TouchableOpacity
            onPress={submitActivityHandler}
            style={{...styles.modalButton2, borderColor: Colors.buttonColor}}>
          <ActivityIndicator size="small" color="black"/>
        </TouchableOpacity>
        // Else it will show the text
        ) : (
          <TouchableOpacity
            onPress={submitActivityHandler}
            style={{...styles.modalButton2, borderColor: Colors.buttonColor}}>
            <Text style={{fontSize: 16, fontWeight: '700', color: "black"}}>
              SAVE
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </Animatable.View>
  </Animatable.View>
  ) : (
    <View>

    </View>
  )}

   </View>
  )
}

const styles = StyleSheet.create({
  container:{
  flex:1,
},
backgroundTop:{
  height: height / 3
},
preferences:{
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  width: '100%',
  bottom: 200,
},
modal:{
  position: 'absolute',
  width: '100%',
  bottom: 0,
  height: height / 1.7,
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  paddingVertical: 35,
  paddingHorizontal: 20,
  backgroundColor: 'white',
  alignItems: 'center'
},
modalButton:{
  paddingVertical: 15,
  borderWidth: 1.5,
  width: '90%',
  borderColor: "#da2626",
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 30,
  marginVertical: 10
},
modalButton2:{
  paddingVertical: 15,
  borderWidth: 1.5,
  borderRadius: 30,
  width: '48%',
  justifyContent: 'center',
  alignItems: 'center',
  borderColor: "#e56767",
  marginHorizontal: 5
},
preferencesButton:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.accentColor,
    padding: 16,
    width: '80%',
    flexDirection: 'row',
    borderRadius: 30
},
settingsText:{
  fontSize: 36,
  color: Colors.iconColor,
  fontWeight: 'bold',
},
boxWrap:{
  width: '80%',
  marginVertical: 20,
  flexDirection: 'row',
  alignItems: 'center',
},
textWrap:{
  marginRight: 60
},
boxText:{
  fontSize: 24,
  fontWeight: '500',
},
button2:{
  backgroundColor: Colors.buttonColor,
  // paddingHorizontal: 40,
  paddingVertical: 15,
  borderRadius: 30,
  width: width / 2.2,
  // height: 30,
  justifyContent: 'center',
  alignItems: 'center',
  marginHorizontal: 5,
  marginVertical: 8
},
buttonText2:{
  fontSize: 16,
  fontWeight: 'bold'
},
})

export default ProfileScreen
