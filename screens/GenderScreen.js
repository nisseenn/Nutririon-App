//Importing the react native and react components
import React, { useRef } from 'react'
import { View, StyleSheet, Animated, TouchableOpacity, Text, Dimensions } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';

//import constants
import COLORS from '../constants/Colors'
import STRINGS from '../constants/Strings'

const {width,height} = Dimensions.get('window')
//Defining HomeScreen functional component
const GenderScreen = (props) => {

  //Creating constants for the position of the different views
  const top = useRef(new Animated.ValueXY({x:0, y: 0})).current;
  const bottom = useRef(new Animated.ValueXY({x:0, y: -50})).current
  const last = useRef(new Animated.ValueXY({x:0, y: -50})).current

  //Defining values for the opacity of the different views
  const opacityGender = new Animated.Value(1);
  const opacityWork = new Animated.Value(0);
  const opacityFreeTime = new Animated.Value(0)

  //Defining userGender to hold which gender the user choose
  let userGender = ''
  //Define var to hold value of which activity level user have at work
  let userWork = ''
  //Define some global variable, because setting state and animation functions not work
  //It might be the JS thread which is active and therefore will not execute both actions
  //Have tried to async await, but still not work properly
  let moveViewVar;

  //Function to handle animation when user pressed the genderbutton
  //Moving the genderview up to top of screen and fades a bit away
  //The level of activity at work view is moved in middle of screen and opacity is set to 1
  const moveView = (gender) => {
    Animated.parallel([
      Animated.timing(top, {
        toValue: {x: 0, y:-225},
        duration: 300,
        useNativeDriver: false
      }),
      Animated.timing(bottom, {
        toValue: {x: 0, y: -140},
        duration: 350,
        useNativeDriver: false
      }),
      Animated.timing(opacityGender, {
        toValue: 0.4,
        duration: 350,
        useNativeDriver: false
      }),
      Animated.timing(opacityWork, {
        toValue: 1,
        duration: 350,
        useNativeDriver: false
      }),
    ]).start()
    userGender = gender
    moveViewVar = 'first'
  }

//Function to move level of activity at work back to invisible, and the gender view back to middle of screen
  const moveViewBack = () => {
    Animated.parallel([
      Animated.timing(top, {
        toValue: {x: 0, y:0},
        duration: 300,
        useNativeDriver: false
      }),
      Animated.timing(bottom, {
        toValue: {x: 0, y: -50},
        duration: 350,
        useNativeDriver: false
      }),
      Animated.timing(opacityGender, {
        toValue: 1,
        duration: 350,
        useNativeDriver: false
      }),
      Animated.timing(opacityWork, {
        toValue: 0,
        duration: 350,
        useNativeDriver: false
      }),
    ]).start()
  }

//Function to move the level of activity at work view up, and level of activity on freetime up
  const moveSecondView = (work) => {
    Animated.parallel([
      Animated.timing(top, {
        toValue: {x: 0, y:-270},
        duration: 300,
        useNativeDriver: false
      }),
      Animated.timing(bottom, {
        toValue: {x: 0, y: -390},
        duration: 350,
        useNativeDriver: false
      }),
      Animated.timing(last, {
        toValue: {x:0, y: -320},
        duration: 300,
        useNativeDriver: false
      }),
      Animated.timing(opacityGender, {
        toValue: 0,
        duration: 350,
        useNativeDriver: false
      }),
      Animated.timing(opacityWork, {
        toValue: 0.4,
        duration: 350,
        useNativeDriver: false
      }),
      Animated.timing(opacityFreeTime, {
        toValue: 1,
        duration: 350,
        useNativeDriver: false
      }),
    ]).start()
    userWork = work
    moveViewVar = 'second'
  }

//Creating a function for the animation to run when level of activity at work have been chosen
  const moveSecondViewBack = () => {
    Animated.parallel([
      Animated.timing(top, {
        toValue: {x: 0, y:-200},
        duration: 300,
        useNativeDriver: false
      }),
      Animated.timing(bottom, {
        toValue: {x: 0, y:-130},
        duration: 300,
        useNativeDriver: false
      }),
      Animated.timing(last, {
        toValue: {x: 0, y: -50},
        duration: 350,
        useNativeDriver: false
      }),
      Animated.timing(opacityGender, {
        toValue: 0.4,
        duration: 350,
        useNativeDriver: false
      }),
      Animated.timing(opacityWork, {
        toValue: 1,
        duration: 350,
        useNativeDriver: false
      }),
      Animated.timing(opacityFreeTime, {
        toValue: 0,
        duration: 350,
        useNativeDriver: false
      }),
    ]).start()
    //Setting the var to fist so we can call the first moveViewBack function when moveSecondView is already called
    moveViewVar = 'first'
  }

  //Returning the JSX code
  return(
    <View style={{flex:1,backgroundColor: "#fff"}}>
      <View style={styles.arrowWrap}>
        <MaterialIcons onPress={() => {props.navigation.popToTop()}} name="navigate-before" color="#000" size={35}/>
      </View>

        {/* Creating a TouchableOpacity which will act as a overlay on top of screen to call the back animation functions */}
        <TouchableOpacity
          onPress={() => {
            //Checking which moveViewBack function should run
            //If undefined, the moveViewBack or moveSecondViewBack should not be run
            if(moveViewVar === undefined){
              return
            }
            if(moveViewVar === 'first'){
              moveViewBack()
            }
            if(moveViewVar === 'second'){
              moveSecondViewBack()
            }
          }}
          style={{width: '100%', height: height / 3.5, position: 'absolute', top: 0, zIndex: 10000, }}>
        </TouchableOpacity>

      <Animated.View 
        useNativeDriver={true}
        style={[{...styles.genderWrap, opacity: opacityGender}, top.getLayout()]}>
        <Text style={{fontSize: 36, fontWeight: 'bold', marginBottom: 20}}>
          Hey!
        </Text>
        <Text style={{marginBottom: 30, fontWeight: '500', fontSize: 18}}>
          Let's start with the basics
        </Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styles.button} onPress={() => {
            //Calling the first animation function when gender is chosen
            //Also passing the gender which is chosen (because setting state fuckes up somehow)
            moveView(STRINGS.sex[0]) //male
          }}>
            <Text style={styles.buttonText}>
              {STRINGS.sex[0] /*male*/}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={async() => {
            //Calling the first animation function when gender is chosen
            //Also passing the gender which is chosen (because setting state fuckes up somehow)
            moveView(STRINGS.sex[1]) //female
          }}>
            <Text style={styles.buttonText}>
              {STRINGS.sex[1] /*female*/}
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      <Animated.View
        useNativeDriver={true}
        style={[{...styles.genderWrap2, opacity: opacityWork}, bottom.getLayout()]}>
        <Text style={{marginBottom: 30, fontWeight: 'bold', fontSize: 20}}>
          Level of activity at work
        </Text>
        <View style={{flexDirection: 'column'}}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.button2} onPress={() => {
              //Calling second function to move view
              moveSecondView(STRINGS.labor[2])
            }}>
              <Text style={styles.buttonText2}>
                {STRINGS.labor[2] /*sitting*/}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2} onPress={() => {
              //Calling second function to move view
              moveSecondView(STRINGS.labor[3])
            }}>
              <Text style={styles.buttonText2}>
                {STRINGS.labor[3] /*standing*/}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.button2} onPress={() => {
              //Calling second function to move view
              moveSecondView(STRINGS.labor[4])
            }}>
              <Text style={styles.buttonText2}>
                {STRINGS.labor[4] /*physical hard*/}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2} onPress={() => {
              //Calling second function to move view
              moveSecondView(STRINGS.labor[1])
            }}>
              <Text style={styles.buttonText2}>
                {STRINGS.labor[1] /*bedridden*/}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>

      <Animated.View
        useNativeDriver={true}
        style={[{...styles.genderWrap3, opacity: opacityFreeTime}, last.getLayout()]}>
        <Text style={{marginBottom: 30, fontWeight: 'bold', fontSize: 20}}>
          Level of activity in free time
        </Text>
        <View style={{flexDirection: 'column'}}>
          <View style={{flexDirection: 'row'}}>

            <TouchableOpacity style={styles.button2} onPress={() => {
              props.navigation.navigate("info", {
                //Passing props via navigation
                gender: userGender,
                work: userWork,
                freetime: STRINGS.activity[1] //less active
              })
            }}>
              <Text style={styles.buttonText2}>
                {STRINGS.activity[1]}
              </Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.button2} onPress={() => {
              props.navigation.navigate("info", {
                //Passing props via navigation
                gender: userGender,
                work: userWork,
                freetime: STRINGS.activity[2]
              })
            }}>
              <Text style={styles.buttonText2}>
                {STRINGS.activity[2]}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity style={styles.button2} onPress={() => {
              props.navigation.navigate("info", {
                //Passing props via navigation
                gender: userGender,
                work: userWork,
                freetime: STRINGS.activity[3]
              })
            }}>
              <Text style={styles.buttonText2}>
                {STRINGS.activity[2]}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>

    </View>
  )
}

GenderScreen.navigationOptions = () => {
  return{
    headerShown: false
  }
}

const styles = StyleSheet.create({
  genderWrap:{
    flex:1,
    zIndex: 4000,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  genderWrap2:{
    // height: 200,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  genderWrap3:{
    // height: 200,
    justifyContent: 'center',
    alignItems: 'center',
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
  buttonText:{
    fontSize: 18,
    fontWeight: 'bold'
  },
  buttonText2:{
    fontSize: 16,
    fontWeight: 'bold'
  },
  arrowWrap:{
    position: 'absolute',
    top: 50,
    left: 10,
    zIndex: 80000
  },
})

//Exporting the component so that we can use it in other components
export default GenderScreen
