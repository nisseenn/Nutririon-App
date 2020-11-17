import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, ActivityIndicator, Alert, Dimensions } from 'react-native'
import { AsyncStorage } from 'react-native'

import { logout } from '../store/actions/auth'
import { nutLogout } from '../store/actions/nutrition'
import { editPreference } from '../store/actions/auth'

import { useDispatch, useSelector } from 'react-redux'
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'
import firebase from 'firebase';
import * as Animatable from 'react-native-animatable';
import Slider from '@react-native-community/slider';
import { Switch } from 'react-native-switch';

//import constants
import COLORS from '../constants/Colors'
import STRINGS from '../constants/Strings'

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
  const [preference, setPreference] = useState(null);
  
	//For the activity details
  const [labor, setLabor] = useState(null)
  const [activity, setActivity] = useState(null)
 
  const dispatch = useDispatch()
  //Getting the Redux state for the preference, labor and freetime
  //the "auth" is connected to out App.js file, where we define the Redux Reducer key value
  const userPreference = useSelector(state => state.auth.preference)
  const userLabor = useSelector(state => state.auth.work)
  const userActivity = useSelector(state => state.auth.freetime)
  let sliderLabor = STRINGS.labor.indexOf(userLabor);
  let sliderActivity = STRINGS.activity.indexOf(userActivity);
  

  //Function to handle submit of preferences
  const submitHandler = async() => {
    try {
      setSaveLoad(true)
      let objectReturn = await editPreference(preference, userLabor, userActivity)
      await dispatch(objectReturn)
      //await dispatch(fetchIngredients())
      setSaveLoad(false)
      setToggleDrop(false)
    } catch (err) {
      // setError(err.message)
    }
  }

  //Function to handle change of activity from user
  const submitActivityHandler = async() => {
    try{
			//Setting state for the loader to work
      setSaveLoad(true)
      //Calling Redux funtion to handle the edit of preference in acitivity
      let objectReturn = await editPreference(userPreference, labor, activity)
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
    
    //Updating RTDB with the new message, using userId ofc
    firebase.database().ref('users').child(user.uid).set(null)
    firebase.database().ref('userMeals').child(user.uid).set(null)
    //Calling Redux logout function we created
    dispatch(logout())
    dispatch(nutLogout())
    //Calling the Firebase function to delete user from the Authentication
    await user.delete()
    //Navigating to Auth ofc
    props.navigation.navigate('Auth')
    //Setting loading to false
    setIsLoading(false)
  }

  return (
      // Profile menu - top of stack navigation
      <View style={styles.container}>

          <View style={{zIndex: 100, position: 'absolute', width: '100%', justifyContent: 'center', alignItems: 'center', top: 100}}>
            <View style={{zIndex: 100, backgroundColor: COLORS.accentColor, width: width / 3, height: width / 3, borderRadius: 300, alignItems: 'center', justifyContent: 'center'}}>
              <Text
                style={styles.settingsText}>
                {/* Displaying our beautiful character(s) */}
                {displayName}
              </Text>
            </View>
          </View>

        <View style={styles.backgroundTop}>
          <LinearGradient
              colors={[COLORS.primaryColor, COLORS.accentColor]}
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
          setPreference(userPreference)
          //Setting state of toggleDrop to true to activate the modal pop up
          setToggleDrop(true)
        }}
        style={styles.preferencesButton}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>
          Change Preference
        </Text>
        <MaterialIcons name="navigate-next" size={26} color="#000"/>
      </TouchableOpacity>
    </View>

    <View style={{...styles.preferences, bottom: 270}}>
      <TouchableOpacity
        onPress={() => {

          //Setting state of work and userActivity to info got from Redux so user gets info on modal pop up
          setLabor( userLabor )
          setActivity( userActivity )
          //Activating the modal pop up
          setToggleActivity(true)
        }}
        style={styles.preferencesButton}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>
          Change Activity Details
        </Text>
        <MaterialIcons name="navigate-next" size={26} color="#000"/>
      </TouchableOpacity>
    </View>

    <View style={styles.preferences}>
      <TouchableOpacity style={styles.preferencesButton}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>
          View Privacy Policy
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
        style={{...styles.preferencesButton, backgroundColor: COLORS.buttonColor}}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>
          Log Out
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
          Delete Account
        </Text>
        <MaterialIcons name="navigate-next" size={26} color="#000"/>
      </TouchableOpacity>
    </View>




  {/* Stack navigations- preference - activity */}





  {/* If toggleDrop is true, show this */}
    {toggleDrop ? (
      <Animatable.View
        useNativeDriver
        duration={200}
        animation={animation}
        style={styles.modal}>

      <Animatable.View
        style={{width: '100%', justifyContent: 'center', alignItems: 'center', bottom: 20}}>
        <View style={styles.boxWrap}>
          <View style={styles.textWrap}>
            <Text style={styles.boxText}>
              {STRINGS.preference[1] /*vegeterian*/}
            </Text>
          </View>

          <View style={{position: 'absolute', right: 0}}>
            <Switch
                value={preference === STRINGS.preference[1] ? true : false}
                onValueChange={() => setPreference(STRINGS.preference[1])}
                //barHeight={10}
                renderActiveText={false}
                renderInActiveText={false}
                circleBorderWidth={0}
                backgroundActive={COLORS.accentColor}
                backgroundInactive={'gray'}
                circleActiveColor={COLORS.primaryColor}
                circleInActiveColor={'lightgrey'}
                changeValueImmediately={true}
                switchWidthMultiplier={2}
            />
          </View>
          
        </View>

        <View style={styles.boxWrap}>
          <View style={styles.textWrap}>
            <Text style={styles.boxText}>
              {STRINGS.preference[2] /*Vegan*/}
            </Text>
          </View>

          <View style={{position: 'absolute', right: 0}}>
            <Switch
                value={preference === STRINGS.preference[2] ? true : false}
                onValueChange={() => setPreference(STRINGS.preference[2])}
                //barHeight={10}
                renderActiveText={false}
                renderInActiveText={false}
                circleBorderWidth={0}
                backgroundActive={COLORS.accentColor}
                backgroundInactive={'gray'}
                circleActiveColor={COLORS.primaryColor}
                circleInActiveColor={'lightgrey'}
                changeValueImmediately={true}
                switchWidthMultiplier={2}
            />
          </View>
          
        </View>

        <View style={styles.boxWrap}>
          <View style={styles.textWrap}>
            <Text style={styles.boxText}>
              {STRINGS.preference[3]}
            </Text>
          </View>

          <View style={{position: 'absolute', right: 0}}>
            <Switch
                value={preference === STRINGS.preference[3] ? true : false}
                onValueChange={() => setPreference(STRINGS.preference[3])}
                //barHeight={10}
                renderActiveText={false}
                renderInActiveText={false}
                circleBorderWidth={0}
                backgroundActive={COLORS.accentColor}
                backgroundInactive={'gray'}
                circleActiveColor={COLORS.primaryColor}
                circleInActiveColor={'lightgrey'}
                changeValueImmediately={true}
                switchWidthMultiplier={2}
            />
          </View>
        </View>

          <View style={styles.boxWrap}>
          <View style={styles.textWrap}>
            <Text style={styles.boxText}>
              {STRINGS.preference[0]}
            </Text>
          </View>

          <View style={{position: 'absolute', right: 0}}>
            <Switch
                value={preference === STRINGS.preference[0] ? true : false}
                onValueChange={() => setPreference(STRINGS.preference[0])}
                //barHeight={10}
                renderActiveText={false}
                renderInActiveText={false}
                circleBorderWidth={0}
                backgroundActive={COLORS.accentColor}
                backgroundInactive={'gray'}
                circleActiveColor={COLORS.primaryColor}
                circleInActiveColor={'lightgrey'}
                changeValueImmediately={true}
                switchWidthMultiplier={2}
            />
          </View>
        </View>

        <View style={{position: 'absolute', bottom: -110, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => setToggleDrop(false)}
            style={styles.modalButton2}>
            <Text style={{fontSize: 16, fontWeight: '700'}}>
              Cancel
            </Text>
          </TouchableOpacity>
          {/* IF save button is pressed, ActivityIndicator will replace the text */}
          {saveLoad ? (
            <TouchableOpacity
              onPress={submitHandler}
              style={{...styles.modalButton2, borderColor: COLORS.buttonColor}}>
            <ActivityIndicator size="small" color="black"/>
          </TouchableOpacity>
          // Else it will show the text
          ) : (
            <TouchableOpacity
              onPress={submitHandler}
              style={{...styles.modalButton2, borderColor: COLORS.buttonColor}}>
              <Text style={{fontSize: 16, fontWeight: '700', color: "black"}}>
                Save
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
          Work activity
        </Text>

        <Text style={{marginBottom: 5, fontWeight: 'bold', fontSize: 15}}>
          {labor}
        </Text>

        <View>   
          {/*Slider with max, min, step and initial value*/}
          <Slider
            maximumValue={4}
            minimumValue={1}
            thumbTintColor={COLORS.primaryColor}
            minimumTrackTintColor= {COLORS.accentColor}
            maximumTrackTintColor="#000000"
            step={1}
            value={sliderLabor}
            onValueChange={(sliderLabor) =>  setLabor(STRINGS.labor[sliderLabor])}
            style={{ width: width - 80, height: 70}}
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{marginTop: -10}}>
            Light
            </Text>
            <Text style={{marginTop: -10}}>
            Hard
            </Text>
          </View>
        </View>

        <Text style={{marginTop: 30, fontWeight: 'bold', fontSize: 20}}>
          Weekly free time activity
        </Text>

        <Text style={{marginTop: 5, marginBottom: -10, fontWeight: 'bold', fontSize: 15}}>
          {activity}
        </Text>

        <View>
                  
          {/**/}
          <Slider
            maximumValue={3}
            minimumValue={0}
            thumbTintColor={COLORS.primaryColor}
            minimumTrackTintColor= {COLORS.accentColor}
            maximumTrackTintColor={COLORS.GREY}
            step={1}
            value={sliderActivity}
            onValueChange={(sliderActivity) =>  setActivity(STRINGS.activity[sliderActivity])}
            style={{width: width - 80, height: 70 }}
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{marginTop: -10}}>
            Less
            </Text>
            <Text style={{marginTop: 5, marginBottom: -10, fontWeight: 'bold'}}>
              {STRINGS.hours[STRINGS.activity.indexOf(activity)]}
            </Text>
            <Text style={{marginTop: -10}}>
            More
            </Text>
          </View>
        </View>



              {/*cancel and save buttons*/}

        <View style={{position: 'absolute', bottom: -100, width: '100%', flexDirection: 'row',justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => setToggleActivity(false)}
            style={styles.modalButton2}>
            <Text style={{fontSize: 16, fontWeight: '700'}}>
              Cancel
            </Text>
          </TouchableOpacity>
          {/* IF save button is pressed, ActivityIndicator will replace the text */}
          {saveLoad ? (
            <TouchableOpacity
              onPress={submitActivityHandler}
              style={{...styles.modalButton2, borderColor: COLORS.buttonColor}}>
            <ActivityIndicator size="small" color="black"/>
          </TouchableOpacity>
          // Else it will show the text
          ) : (
            <TouchableOpacity
              onPress={submitActivityHandler}
              style={{...styles.modalButton2, borderColor: COLORS.buttonColor}}>
              <Text style={{fontSize: 16, fontWeight: '700', color: "black"}}>
                Save
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
  );
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
    backgroundColor: COLORS.accentColor,
    padding: 16,
    width: '80%',
    flexDirection: 'row',
    borderRadius: 30
},
settingsText:{
  fontSize: 36,
  color: COLORS.iconColor,
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
  backgroundColor: COLORS.buttonColor,
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
