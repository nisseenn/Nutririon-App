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
    itemData.item.ingredients.map(cals => {
      data.push(cals.energi2.split(/[=}]/)[2], cals.fat.split(/[=}]/)[2], cals.carbs.split(/[=}]/)[2], cals.protein.split(/[=}]/)[2])
    })

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
  cardWrap:{
    flexGrow: 1,
    alignItems: 'center'
  },
  card:{
    backgroundColor: 'rgba(176,189,209,1)',
    width: '95%',
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
    flexDirection: 'row',
    shadowRadius: 2,
    shadowOffset: {height:2},
    shadowOpacity: 0.1,
    zIndex: 1000,
    flex:1,
    height: "auto",
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
