import React, { useState, useReducer, useCallback, useEffect, useRef } from 'react'
import { ScrollView, View, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Text, Button, ActivityIndicator, Alert, Image, Dimensions } from 'react-native'
import { AsyncStorage } from 'react-native'
import { logout } from '../store/actions/auth'
import { editPreference } from '../store/actions/auth'
import { useDispatch, useSelector } from 'react-redux'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'
import firebase from 'firebase';
import * as Animatable from 'react-native-animatable';
import Animated from 'react-native-reanimated';
import { RadioButton, Checkbox } from 'react-native-paper';

import Colors from '../constants/Colors'

const {width,height} = Dimensions.get('window')
//making it cleaner to use firebase.database code
var database = firebase.database();

const ProfileScreen = (props) => {

  const [displayName, setDisplayName] = useState(null)

  //state for the modal to pop up when pressing change preferences
  const [toggleDrop, setToggleDrop] = useState(false)
  const [animation, setAnimation] = useState("fadeInUpBig")
  const [isLoading, setIsLoading] = useState(false)
  const [saveLoad, setSaveLoad] = useState(false)
  //For the single choice
  const [checked, setChecked] = useState(null);

  const dispatch = useDispatch()
  //Getting the Redux state for the preference
  //the "auth" is connected to out App.js file, where we define the Redux Reducer key value
  const userPreference = useSelector(state => state.auth.preference)

  // console.log(checked);

  const submitHandler = async() => {
    try {
      setSaveLoad(true)
      let objectReturn = await editPreference(checked)
      await dispatch(objectReturn)
      setSaveLoad(false)
      setToggleDrop(false)
    } catch (err) {
      // setError(err.message)
    }
  }

  useEffect(() => {
    const getDisplayName = async () => {
      const userData = await AsyncStorage.getItem('userData');

      const transformedData = JSON.parse(userData);
      //Getting data from HD
      const { token, userId, displayName } = transformedData;

      //Doing some basic JS to get first characters of the name
      const displayArray = displayName.split(' ')
      const firstChar = displayArray[0].slice(0,1)
      const secondChar = displayArray[1].slice(0,1)
      const displayNameShort = firstChar.toUpperCase() + secondChar.toUpperCase()
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
      weight: null
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
          <View style={{zIndex: 1000, backgroundColor: Colors.accentColor, padding: 40, borderRadius: 300}}>
            <Text
              style={styles.settingsText}>
              {/* Displaying our beautiful two characters */}
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
        setChecked(userPreference)
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
    <TouchableOpacity style={styles.preferencesButton}>
      <Text style={{fontSize: 16, fontWeight: 'bold'}}>
        CHANGE EMAIL
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
        '',
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
            onPress={() => {
              setChecked('pesc')
            }}
          />
        </View>
      </View>

      <View style={{height: 40}}>
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
        onPress={async() => {
          setToggleDrop(false)
        }}
        style={styles.modalButton}>
        <Text style={{fontSize: 16, fontWeight: '700'}}>
          CANCEL
        </Text>
      </TouchableOpacity>
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
  borderColor: "#e56767",
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 30,
  marginVertical: 10
},
preferencesButton:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.accentColor,
    padding: 16,
    width: '100%',
    flexDirection: 'row'
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
})

export default ProfileScreen
