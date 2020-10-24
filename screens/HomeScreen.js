//The HomeScreen will cointain:
// 1. recommended daily calorie intake
// 2. Daily dietary intake
// 3. Suggestion carousel, which can be viewd as a list, then user will be taken to suggestionscreen

//Importing the react native and react components
import React, { useState, useReducer, useCallback, useEffect, useRef } from 'react'
import { ScrollView, View, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Text, Button, ActivityIndicator, Alert, Image, Dimensions } from 'react-native'
import { fetchUserData } from '../store/actions/auth'
import { fetchIngredients } from '../store/actions/nutrition'
import { useDispatch, useSelector } from 'react-redux'
import Colors from '../constants/Colors'
import ProgressCircle from 'react-native-progress-circle'
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { ProgressBar } from 'react-native-paper';

const {width,height} = Dimensions.get('window')

//Defining HomeScreen functional component
const HomeScreen = (props) => {
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(false)

  const userNutrients = useSelector(state => state.nutrition.nutritientSuggestions)
  const calorySuggestion = useSelector(state => state.nutrition.calorySuggestion)
  const caloryRef = useSelector(state => state.nutrition.caloryRef)
  const nutrients = useSelector(state => state.nutrition.nutrients)

  const percent = Math.round( calorySuggestion / caloryRef * 100)
  const proteinPercent = nutrients.protein / nutrients.total
  const fatPercent = nutrients.fat / nutrients.total
  const carbsPercent = nutrients.carbs / nutrients.total

  //Creating a function which will run on start of app
  const loadUserData = useCallback(async () => {
  try {
    //We call the Redux function which get the preferences
    await dispatch(fetchUserData())
  } catch (err) {
    console.log('failed');
  }
}, [dispatch])

const loadIngredients= useCallback(async () => {
try {
  //We call the Redux function which get the preferences
  await dispatch(fetchIngredients())
} catch (err) {
  console.log('failed');
}
}, [dispatch])

const getData = async() => {
  setIsLoading(true)
  await loadUserData()
  await loadIngredients()
  setIsLoading(false)
}

//Calling the function before render with useEffect
useEffect(() => {
  getData()
}, [dispatch])

  if(isLoading){
    return(
      <View style={styles.container}>
        <ActivityIndicator size="large"/>
      </View>
    )
  }
  else{
  //Returning the JSX code
  return(
    <View style={styles.container}>
      <View style={styles.header}>

        <View style={styles.calendarWrap}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("calendar")
            }}
            style={styles.calendarButton}>
            <FontAwesome5 size={30} color="#fff" name="calendar-alt"/>
            <Text style={styles.calendarText}>Today</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contentWrap}>

          <View style={styles.progressWrap}>
            <ProgressCircle
                percent={percent}
                radius={height / 10}
                borderWidth={7}
                color={Colors.buttonColor}
                shadowColor="#fff"
                bgColor={Colors.primaryColor}
                >
                <View style={styles.progressText}>
                  <Text style={{ fontSize: 36, fontWeight: '600', fontStyle: 'italic', color: "#fff"}}>{calorySuggestion}</Text>
                  <Text style={{ fontSize: 16, fontWeight: '400', fontStyle: 'italic', color: "#fff"}}>Calories left</Text>
                </View>
            </ProgressCircle>
          </View>

          <View style={styles.barWrap}>
            <View style={styles.nutrientWrap}>
              <Text style={styles.nutritionText}>Protein</Text>
              <ProgressBar progress={0.5} style={styles.progressBar} color={Colors.buttonColor} />
            </View>
            <View style={styles.nutrientWrap}>
              <Text style={styles.nutritionText}>Fat</Text>
              <ProgressBar progress={fatPercent} style={styles.progressBar} color={Colors.buttonColor} />
            </View>
            <View style={styles.nutrientWrap}>
              <Text style={styles.nutritionText}>Carbs</Text>
              <ProgressBar progress={carbsPercent} style={styles.progressBar} color={Colors.buttonColor} />
            </View>
            <TouchableOpacity
              onPress={() => {
                console.log('pressed');
              }}
              style={styles.detailsButton}>
              <Text style={styles.detailText}>
                See details
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </View>
  )
}
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header:{
    position: 'absolute',
    top:0,
    width: '100%',
    height: height / 2.6,
    backgroundColor: Colors.primaryColor,
  },
  calendarWrap:{
    position: 'absolute',
    top: 60,
    left: 20
  },
  calendarButton:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: .5,
    // paddingVertical: 10,
    // paddingHorizontal: 20,
    // borderColor: "#fff",
    // borderRadius: 15
  },
  calendarText:{
    color: "#fff",
    marginLeft: 10,
    fontSize: 24,
    fontWeight: '700'
  },
  contentWrap:{
    flexDirection: 'row',
    position: 'absolute',
    bottom:0,
  },
  progressWrap:{
    marginLeft: 20,
    marginBottom: 20
  },
  progressText:{
    justifyContent: 'center',
    alignItems: 'center'
  },
  barWrap:{
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: width / 8,
    flex:1
  },
  progressBar:{
    width: width / 3,
    backgroundColor: '#fff'
  },
  nutrientWrap:{
    marginVertical: 10
  },
  nutritionText:{
    color: "#fff",
    marginBottom: 5
  },
  detailsButton:{
    marginTop: 10
  },
  detailText:{
    color: "#fff"
  }
})

//Exporting the component so that we can use it in other components
export default HomeScreen
