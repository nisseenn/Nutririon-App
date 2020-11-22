import React, { useEffect, useState, useCallback } from 'react'
import { ScrollView, View, Animated, FlatList, LayoutAnimation, StyleSheet, TouchableOpacity, Text, ActivityIndicator, Image, Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import MealsListItem from './MealsListItem'

const {width,height} = Dimensions.get('window')

//Defining HomeScreen functional component
const UserMealList = (props) => {
  const dispatch = useDispatch()

  const [list, setList] = useState([])
  const [open, setOpen] = useState(false)

  let listItems = []
  const [isRefreshing, setIsRefreshing] = useState(false)

  const meals = useSelector(state => state.nutrition.nutritientSuggestions)

  const heightOfShit = open ? height / 4 : height / 8

  const renderIngredients = (itemData) => {
    let data = []
    let calories = 0
    let fat = 0;
    let protein = 0;
    let carbs = 0;
    // console.log(itemData.item);
    itemData.item.ingredients.map((cals, index) => {
      calories += parseInt(cals.energi2.split(/[=}]/)[2])
      fat += parseInt(cals.fat.split(/[=}]/)[2])
      protein += parseInt(cals.protein.split(/[=}]/)[2])
      carbs += parseInt(cals.carbs.split(/[=}]/)[2])
    })
    // console.log(calories, fat, protein, carbs);
    data.push(calories, fat, carbs, protein)

    return (
      <MealsListItem
        mealType={itemData.item.mealType}
        date={itemData.item.timestamp}
        data={data}
      />
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
        contentContainerStyle={{width: width, marginTop: 130, paddingBottom: height / 3 }}
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
  image:{
    marginLeft: 20,
    width: 60,
    height: 60
  },
})

//Exporting the component so that we can use it in other components
export default UserMealList
