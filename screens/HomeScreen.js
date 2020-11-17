//The HomeScreen will cointain:
// 1. recommended daily calorie intake
// 2. Daily dietary intake
// 3. Suggestion carousel, which can be viewd as a list, then user will be taken to suggestionscreen

//Importing the react native and react components
import React, { useState, useCallback, useEffect, useRef } from 'react'
import { ScrollView, View, Animated, StyleSheet, TouchableOpacity, Text, ActivityIndicator, Image, Dimensions } from 'react-native'
import { fetchUserData } from '../store/actions/auth'
import { fetchIngredients } from '../store/actions/nutrition'
import { fetchUserMeals } from '../store/actions/nutrition'
import { useDispatch, useSelector } from 'react-redux'
import COLORS from '../constants/Colors'
import Calendar from '../components/Calendar'
import Carousel from '../components/Carousel'

import ProgressCircle from 'react-native-progress-circle'
import { FontAwesome5 } from '@expo/vector-icons';
import { ProgressBar } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

const {width,height} = Dimensions.get('window')

const HEADER_MAX_HEIGHT = height / 2.6;
const HEADER_MIN_HEIGHT = height / 7;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const breakfast = require('../assets/breakfast.png')
const lunch = require('../assets/lunchbox.png')
const dinner = require('../assets/fast-food.png')
const snacks = require('../assets/snacks.png')

const AnimatableTouchableOpacity = Animatable.createAnimatableComponent(TouchableOpacity);
const AnimatedCircle = Animated.createAnimatedComponent(ProgressCircle)
const AnimatedText = Animated.createAnimatedComponent(Text)

//Defining HomeScreen functional component
const HomeScreen = (props) => {
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(false)
  const [toggleDrop, setToggleDrop] = useState(false)
  const [dateShown, setDateShown] = useState('Today')
  const [animation, setAnimation] = useState("slideInDown")

  const scrollY = useRef(new Animated.Value(0)).current;
  //const fade = useRef(new Animated.Value(0)).current;

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE * .99],
    outputRange: [0, -HEADER_SCROLL_DISTANCE * 1.05],
    extrapolate: 'clamp',
  });

  const flatListTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE * 2],
    outputRange: [0, -HEADER_SCROLL_DISTANCE * .9],
    extrapolate: 'clamp',
  });

  const barOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 30, HEADER_SCROLL_DISTANCE / 2],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });

  const textTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });

  const dateTranslateX = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, width / 2],
    extrapolate: 'clamp',
  });

  //const userNutrients = useSelector(state => state.nutrition.nutritientSuggestions)
  const calorySuggestion = useSelector(state => state.nutrition.calorySuggestion)
  const caloryRef = useSelector(state => state.nutrition.caloryRef)
  const nutrients = useSelector(state => state.nutrition.nutrients)
  const todayMeal = useSelector(state => state.nutrition.todayMeal)
  const weekSummary = useSelector(state => state.nutrition.weekSummary)

  console.log(todayMeal);
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

const loaduserNutrients= useCallback(async () => {
try {
  //We call the Redux function which get the preferences
  await dispatch(fetchUserMeals())
} catch (err) {

}
}, [dispatch])

const getData = async() => {
  setIsLoading(true)
  await loadUserData()
  await loadIngredients()
  await loaduserNutrients()
  setIsLoading(false)
}

const handleSelectDate = async(date) => {
  const filtered = date.toString().split(" ")

  const month = date.month()
  const year = date.year()
  const day = date.date()

  let optDate = new Date();
  let optDay = optDate.getDate()
  let optMonth = optDate.getMonth()
  let optYear = optDate.getFullYear()

  if(day == optDay && month == optMonth && year == optYear){
    setDateShown("Today")
  }
  else if(day == optDay - 1 && month == optMonth && year == optYear){
    setDateShown("Yesterday")
  }
  else{
    setDateShown(filtered[0] + " " + filtered[1] + " " + filtered[2])
  }
  await dispatch(fetchUserMeals(day, month, year))
  setToggleDrop(false)
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
          useNativeDriver={true}
          duration={300}
          animation={animation}
          style={styles.modal}>

          <Calendar onSelectDate={handleSelectDate}/>
          <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
            <TouchableOpacity
              // animation="fadeInDown"
              // useNativeDriver
              // duration={400}
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
      <Animated.View
        useNativeDriver={true}
        style={[styles.calendarWrap, {transform: [{translateX: dateTranslateX}]}]}>
        <TouchableOpacity
          onPress={() => {
            setToggleDrop(true)
          }}
          style={styles.calendarButton}>
          <FontAwesome5 size={30} color="#fff" name="calendar-alt"/>
          <Text style={styles.calendarText}>{dateShown}</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View
        style={[styles.header, {transform: [{translateY: headerTranslateY}]}]}>

        <View style={styles.contentWrap}>

          <View style={styles.progressWrap}>
            <AnimatedCircle
                useNativeDriver={true}
                percent={percent}
                radius={height / 10}
                borderWidth={7}
                color={COLORS.buttonColor}
                shadowColor="#fff"
                bgColor={COLORS.primaryColor}
                style={{opacity: barOpacity}}
                >
                {/* <View style={styles.progressText}>
                  <Animated.Text style={{ fontSize: 36, fontWeight: '600', fontStyle: 'italic', color: "#fff"}}>{calorySuggestion}</Animated.Text>
                  <Animated.Text style={{ fontSize: 16, fontWeight: '400', fontStyle: 'italic', color: "#fff"}}>Calories left</Animated.Text>
                </View> */}
            </AnimatedCircle>
          </View>

          <Animated.View
            useNativeDriver={true}
            style={[styles.progressText2, {transform: [{translateY: textTranslateY}]}]}>
            <Animated.Text style={styles.totalCals}>{calorySuggestion}</Animated.Text>
            <Animated.Text style={styles.totalCalsDesc}>Calories left</Animated.Text>
          </Animated.View>

          <Animated.View
            useNativeDriver={true}
            style={[{...styles.barWrap, opacity: barOpacity}]}>
            <View style={styles.nutrientWrap}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.nutritionText}>Protein</Text>
                <Text style={styles.nutritionText2}>{nutrients.protein}g / {nutrients.total}g</Text>
              </View>
              <ProgressBar progress={proteinPercent} style={styles.progressBar} color={COLORS.buttonColor} />
            </View>
            <View style={styles.nutrientWrap}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.nutritionText}>Fat</Text>
                <Text style={styles.nutritionText2}>{nutrients.fat}g / {nutrients.total}g</Text>
              </View>
              <ProgressBar progress={fatPercent} style={styles.progressBar} color={COLORS.buttonColor} />
            </View>
            <View style={styles.nutrientWrap}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.nutritionText}>Carbs</Text>
                <Text style={styles.nutritionText2}>{nutrients.carbs}g / {nutrients.total}g</Text>
              </View>
              <ProgressBar progress={carbsPercent} style={styles.progressBar} color={COLORS.buttonColor} />
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
          </Animated.View>

        </View>
      </Animated.View>

        <Animated.ScrollView
          useNativeDriver={true}
          scrollEventThrottle={16}
          snapToInterval={height / 2}
          decelerationRate="fast"
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }], // event.nativeEvent.contentOffset.x to scrollX
            { useNativeDriver: true },
          )}
          style={[{transform: [{translateY: flatListTranslateY}]}]}
          contentContainerStyle={styles.cardWrapper}>
          <View style={styles.titleWrap}>
            <Text style={styles.title}>Daily Summary</Text>
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

            <View style={styles.titleWrap}>
              <Text style={styles.title}>Weekly Summary</Text>
            </View>
            <View style={{}}>
              {weekSummary.length == 0 ? (
                <ActivityIndicator size="small" color={COLORS.primaryColor}></ActivityIndicator>
              ) : (
                <Carousel
                  style={{zIndex: 30000, position: 'absolute', backgroundColor: 'red'}}
                  cals={weekSummary[0].cals}
                  carbs={weekSummary[0].carbs}
                  protein={weekSummary[0].protein}
                  fat={weekSummary[0].fat}
                />
              )}
            </View>

        </Animated.ScrollView>

    </View>
  )
}
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    // justifyContent: 'center',
    // alignItems: 'center',
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
    backgroundColor: COLORS.primaryColor,
    marginBottom: height / 2.6,
    zIndex: 4000,
    overflow: 'hidden'
  },
  calendarWrap:{
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 9000,
  },
  titleWrap:{
    width: '90%',
    marginVertical: 10,
  },
  title:{
    fontSize: 22,
    fontWeight: 'bold',
  },
  calendarButton:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
    marginBottom: 20,
    overflow: 'hidden'
  },
  totalCals:{
    fontSize: 36,
    fontWeight: '600',
    fontStyle: 'italic',
    color: "#fff"
  },
  totalCalsDesc:{
    fontSize: 16,
    fontWeight: '400',
    fontStyle: 'italic',
    color: "#fff"
  },
  progressText:{
    justifyContent: 'center',
    alignItems: 'center'
  },
  progressText2:{
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 70,
    left: 55
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
    height: height + HEADER_SCROLL_DISTANCE / 2,
    position: 'absolute',
    top: height / 2.6,
    width: '100%',
    zIndex: -1000,
    alignItems: 'center',
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
    zIndex: 1000,
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
