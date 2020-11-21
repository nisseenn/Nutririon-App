import React, { useEffect, useState, useCallback } from 'react'
import { ScrollView, View, Animated, FlatList, StyleSheet, TouchableOpacity, Text, ActivityIndicator, Image, Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

const {width,height} = Dimensions.get('window')

const breakfast = require('../assets/breakfast.png')
const lunch = require('../assets/lunchbox.png')
const dinner = require('../assets/fast-food.png')
const snacks = require('../assets/snacks.png')

//Defining HomeScreen functional component
const UserMealList = (props) => {
  const dispatch = useDispatch()

  const [list, setList] = useState([])
  let listItems = []
  const [isRefreshing, setIsRefreshing] = useState(false)

  const meals = useSelector(state => state.nutrition.nutritientSuggestions)

  // const renderMeals = () => {
  //   meals.map((meal, index) => {
  //     let obj = {
  //       [index]: [meal.ingredients[0].name],
  //     }
  //     listItems.push(obj)
  //   })
  // }

  const renderIngredients = (itemData) => {
    const cals = itemData.item.ingredients.map(cals => parseInt(cals.energi2.split(/[=}]/)[2]).toFixed(1))
    return (
      <View style={styles.cardWrap}>
        <TouchableOpacity style={styles.card}>
          {itemData.item.mealType == "Breakfast" ? (
            <Image source={breakfast} style={styles.image}/>
          ) : (
            <View></View>
          )}

          {itemData.item.mealType == "Dinner" ? (
            <Image source={dinner} style={styles.image}/>
          ) : (
            <View></View>
          )}

          {itemData.item.mealType == "Lunch" ? (
            <Image source={breakfast} style={styles.image}/>
          ) : (
            <View></View>
          )}

          {itemData.item.mealType == "Snacks" ? (
            <Image source={snacks} style={styles.image}/>
          ) : (
            <View></View>
          )}

          <View>
            <Text style={styles.cardTitle}>{itemData.item.mealType}</Text>
            <Text style={styles.cardDesc}>{itemData.item.timestamp.day}.{itemData.item.timestamp.month}.{itemData.item.timestamp.year}</Text>
          </View>
          <View>
            <Text style={styles.cardTitle}>{cals}</Text>
          </View>
        </TouchableOpacity>

      </View>
    )
  };

  // useEffect(() => {
  //   renderMeals()
  //
  // }, [dispatch])

  const loadIngredients = useCallback(async () => {
  // setList(ingredients)
  // setIsRefreshing(true)
  // setError(null)
  // try {
  //   await dispatch(fetchIngredients())
  // } catch (err) {
  //   setError(err.message)
  // }
  // setIsRefreshing(false)
}, [dispatch])

  //Returning the JSX code
  return(
    <View>
      <FlatList
        contentContainerStyle={{width: width, height: height, marginTop: 130}}
        scrollEventThrottle={16}
        onRefresh={loadIngredients}
        refreshing={isRefreshing}
        numColumns={1}
        data={meals}
        renderItem={renderIngredients}
        keyExtractor={(item, index) => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  cardWrap:{
    alignItems: 'center'
  },
  card:{
    backgroundColor: 'rgba(176,189,209,1)',
    width: '95%',
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
  image:{
    marginLeft: 20,
    width: 60,
    height: 60
  },
  cardTitle:{
    fontSize: 20,
    marginLeft: 30,
    color:"#000",
    fontWeight: 'bold',
  },
  cardDesc:{
    fontSize: 16,
    marginLeft: 30,
    color:"#000",
    fontWeight: '400',
    marginTop: 5
  },
})

//Exporting the component so that we can use it in other components
export default UserMealList
