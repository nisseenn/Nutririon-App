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
import Calendar from '../components/Calendar'
import ProgressCircle from 'react-native-progress-circle'
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { ProgressBar } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

const {width,height} = Dimensions.get('window')

const breakfast = require('../assets/breakfast.png')
const lunch = require('../assets/lunchbox.png')
const dinner = require('../assets/fast-food.png')
const snacks = require('../assets/snacks.png')

//Defining HomeScreen functional component
const HomeScreen = (props) => {
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(false)
  const [toggleDrop, setToggleDrop] = useState(false)
  const [animation, setAnimation] = useState("slideInDown")

  const userNutrients = useSelector(state => state.nutrition.nutritientSuggestions)
  const calorySuggestion = useSelector(state => state.nutrition.calorySuggestion)
  const caloryRef = useSelector(state => state.nutrition.caloryRef)
  const nutrients = useSelector(state => state.nutrition.nutrients)
  const todayMeal = useSelector(state => state.nutrition.todayMeal)

  const percent1 = 1 - (calorySuggestion / caloryRef)
  const percent = Math.round(percent1 * 100)

  const proteinPercent = nutrients.protein / nutrients.total
  const fatPercent = nutrients.fat / nutrients.total
  const carbsPercent = nutrients.carbs / nutrients.total

  //Creating a function which will run on start of app
  const loadUserData = useCallback(async () => {
  try {
    //We call the Redux function which get the preferences
    await dispatch(fetchUserData())
  } catch (err) {
  }
}, [dispatch])

const loadIngredients= useCallback(async () => {
try {
  //We call the Redux function which get the preferences
  await dispatch(fetchIngredients())
} catch (err) {

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
      {toggleDrop ? (
        <Animatable.View
          useNativeDriver
          duration={200}
          animation={animation}
          style={styles.modal}>

          <Calendar/>
          <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
            <TouchableOpacity
              onPress={() => setToggleDrop(false)}
              style={styles.modalButton}>
              <Text style={{fontSize: 16, fontWeight: '700'}}>
                CANCEL
              </Text>
            </TouchableOpacity>
          </View>

        </Animatable.View>
      ) : (
        <View>

        </View>
      )}
      <View style={styles.header}>

        <View style={styles.calendarWrap}>
          <TouchableOpacity
            onPress={() => {
              setToggleDrop(true)
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
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.nutritionText}>Protein</Text>
                <Text style={styles.nutritionText2}>{nutrients.protein}g / {nutrients.total}g</Text>
              </View>
              <ProgressBar progress={proteinPercent} style={styles.progressBar} color={Colors.buttonColor} />
            </View>
            <View style={styles.nutrientWrap}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.nutritionText}>Fat</Text>
                <Text style={styles.nutritionText2}>{nutrients.fat}g / {nutrients.total}g</Text>
              </View>
              <ProgressBar progress={fatPercent} style={styles.progressBar} color={Colors.buttonColor} />
            </View>
            <View style={styles.nutrientWrap}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.nutritionText}>Carbs</Text>
                <Text style={styles.nutritionText2}>{nutrients.carbs}g / {nutrients.total}g</Text>
              </View>
              <ProgressBar progress={carbsPercent} style={styles.progressBar} color={Colors.buttonColor} />
            </View>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("nutrientdetail")
              }}
              style={styles.detailsButton}>
              <Text style={styles.detailText}>
                See details
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
      <View style={styles.cardWrapper}>
        <ScrollView contentContainerStyle={{width: '100%', alignItems: 'center', height: '100%'}}>
          <View style={styles.titleWrap}>
            <Text style={styles.title}>Summary</Text>
          </View>

            <TouchableOpacity style={styles.card}>
              <Image source={breakfast} style={styles.image}/>
              <View>
                <Text style={styles.cardTitle}>Breakfast</Text>
                {todayMeal.Breakfast == undefined ? (
                  <Text style={styles.cardDesc}>0 calories</Text>
                ) : (
                  <Text style={styles.cardDesc}>{todayMeal.Breakfast} calories</Text>
                )}
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card}>
              <Image source={lunch} style={styles.image}/>
              <View>
                <Text style={styles.cardTitle}>Lunch</Text>
                {todayMeal.Lunch == undefined ? (
                  <Text style={styles.cardDesc}>0 calories</Text>
                ) : (
                  <Text style={styles.cardDesc}>{todayMeal.Lunch} calories</Text>
                )}
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card}>
              <Image source={dinner} style={styles.image}/>
              <View>
                <Text style={styles.cardTitle}>Dinner</Text>
                {todayMeal.Dinner == undefined ? (
                  <Text style={styles.cardDesc}>0 calories</Text>
                ) : (
                  <Text style={styles.cardDesc}>{todayMeal.Dinner} calories</Text>
                )}
              </View>
            </TouchableOpacity>

        </ScrollView>
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
  modal:{
    position: 'absolute',
    width: '100%',
    top: 0,
    height: height / 2.6,
    backgroundColor: 'white',
    zIndex: 6000,
  },
  modalButton:{
    paddingVertical: 10,
    borderWidth: 1.5,
    width: '50%',
    borderColor: "#da2626",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    position: 'absolute',
    bottom: 0,
    marginVertical: 10
  },
  header:{
    position: 'absolute',
    top:0,
    width: '100%',
    height: height / 2.6,
    backgroundColor: Colors.primaryColor,
    marginBottom: height / 2.6
  },
  calendarWrap:{
    position: 'absolute',
    top: 60,
    left: 20
  },
  titleWrap:{
    width: '90%',
    marginVertical: 10
  },
  title:{
    fontSize: 22,
    fontWeight: 'bold',
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
  cardDesc:{
    fontSize: 16,
    marginLeft: 30,
    color:"#000",
    fontWeight: '400',
    marginTop: 5
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
  nutritionText2:{
    fontSize: 12,
    position: 'absolute',
    right: 0,
    color: "#fff",
    marginBottom: 5
  },
  detailsButton:{
    marginTop: 10
  },
  detailText:{
    color: "#fff"
  },
  cardWrapper:{
    height: '100%',
    position: 'absolute',
    top: height / 2.6,
    width: '100%',
  },
  card:{
    backgroundColor: '#fff',
    width: '90%',
    height: height / 8,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
    flexDirection: 'row',
    shadowRadius: 2,
    shadowOffset: {height:2},
    shadowOpacity: 0.1,
  },
  cardTitle:{
    fontSize: 20,
    marginLeft: 30,
    color:"#000",
    fontWeight: 'bold',
  },
  image:{
    marginLeft: 20,
    width: 60,
    height: 60
  },
})

//Exporting the component so that we can use it in other components
export default HomeScreen
