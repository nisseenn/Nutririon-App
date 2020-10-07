import React, { useState, useReducer, useCallback, useEffect, useRef } from 'react'
import { ScrollView, View, TextInput, StyleSheet, FlatList, KeyboardAvoidingView, TouchableOpacity, Text, Button, ActivityIndicator, Alert, Image, Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Colors from '../constants/Colors'

import { fetchIngredients } from '../store/actions/nutrition'
import { addIngredient } from '../store/actions/nutrition'
import { deleteIngredient } from '../store/actions/nutrition'
import { addMeal } from '../store/actions/nutrition'

import { SearchBar } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import ListButton from '../components/ListButton'

import IngredientItem from '../components/IngredientItem'

const {width,height} = Dimensions.get('window')

const NewMeal = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState()
  const [search, setSearch] = useState(null)
  const [list, setList] = useState([])
  const [ingredientList, setIngredientList] = useState([])
  //Getting the param passed from AddButton.js
  const mealType = props.navigation.getParam("meal")

  const dispatch = useDispatch()
  //Getting the ingredients from the Redux store
  const ingredients = useSelector(state => state.nutrition.ingredients)
  //Getting the userPreference from the redux store
  const userPreference = useSelector(state => state.auth.preference)
  //Getting the user ingredients from redux store
  const mealIngredients = useSelector(state => state.nutrition.mealIngredients)


  const loadIngredients = useCallback(async () => {
  setList(ingredients)
  setIsRefreshing(true)
  setError(null)
  try {
    await dispatch(fetchIngredients())
  } catch (err) {
    setError(err.message)
  }
  setIsRefreshing(false)
}, [dispatch, setIsLoading, setError, userPreference])

  // const updateList = () => {
  //   await dispatch(fetchIngredients())
  // }
  // To handle the update of ingredients once preference is changed
  useEffect(() => {
    setList(ingredients)
  }, [ingredients])

  useEffect(() => {
    setIngredientList(mealIngredients)
  }, [mealIngredients])

  //Function to handle the filtering from search, getting the parameter which is the user input
  const searchIngredients = (value) => {
    //Creating a new array which only contains the input in the name
    const filteredIngredients = ingredients.filter(ingredient => {
      let name = ingredient.name.toLowerCase()
      let search = value.toLowerCase()
      //returning the names which contain the value and hence is greater than -1 (which is default to false)
      return name.indexOf(search) > -1
    })
    //Updating the list which is used in the Flatlist with the filtered list
    setList(filteredIngredients)
  }
  //Function to handle deleting ingredients in the meal
  const deleteHandler = (id) => {
    //calling the redux function
    let objectReturn = deleteIngredient(id)
    //Dispatching the object returning from redux function to the Redux Store
    dispatch(objectReturn)
  }

  const submitHandler = async() => {
    await dispatch(addMeal())
  }

  //Function to render the different ingredients
  //Getting the itemData from the Flatlist
  const renderIngredients = (itemData) => {
    return (
        <IngredientItem
          key={itemData.item.id}
          name={itemData.item.name}
          id={itemData.item.id}
          onSelectIngredient={() => {
            props.navigation.navigate("detail", {
              name: itemData.item.name,
              id: itemData.item.id,
              energi: itemData.item.Energi1,
              fett: itemData.item.Fett,
              protein: itemData.item.Protein,
              karbo: itemData.item.Karbo,
              fiber: itemData.item.Fiber,
              sukker: itemData.item.Sukker,
              porsjon: itemData.item.Portion
            })
          }}
          onAddIngredient={() => {
            let objectReturn = addIngredient(itemData.item.id, itemData.item.name)
            dispatch(objectReturn)
          }}
          />
    )
  };

  useEffect(() => {
  setIsLoading(true)
  loadIngredients().then(() => {
    setIsLoading(false)
  })
}, [dispatch])

  if(isLoading){
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.iconColor} />
      </View>
    );
  }

  return(
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}>
      <View style={{width: width, position: 'absolute', top: 0, zIndex: 4000, height: 100, justifyContent: 'center'}}>
        <View style={styles.mealTitleWrap}>
          <Text style={styles.mealText}>{mealType}</Text>
        </View>
        <LinearGradient
            colors={[Colors.primaryColor, Colors.accentColor]}
            style={{
              // flex:1,
              height: height / 3
            }}
          />
        <SearchBar
          lightTheme={true}
          platform="ios"
          cancelButtonProps={{color: "#000"}}
          containerStyle={{position: 'absolute', top: 90, backgroundColor: 'transparent'}}
          inputContainerStyle={{backgroundColor: "#e5e5e5"}}
          placeholder="Search here..."
          onChangeText={text => searchIngredients(text)}
          value={search}
          searchIcon={{color: Colors.iconColor}}
        />
      </View>
      <FlatList
        contentContainerStyle={{ paddingTop: 200, width: width}}
        scrollEventThrottle={16}
        onRefresh={loadIngredients}
        refreshing={isRefreshing}
        numColumns={1}
        data={list}
        renderItem={renderIngredients}
        keyExtractor={(item, index) => item.id}
      />

      {/* Button in bottom right to show your ingredients added */}
      <ListButton
        deleteIngredient={deleteHandler}
        ingredients={ingredientList}
        handleSubmitMeal={submitHandler}
      />

    </View>
  )
}

NewMeal.navigationOptions = () => {
  return{
    headerShown: false
  }
}

const styles = StyleSheet.create({
  mealTitleWrap:{
    position: 'absolute',
    top: 60,
    zIndex: 4000,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  mealText:{
    fontSize: 18,
    color:"#fff",
    fontWeight: '500',
  },
  input: {
   width: '100%',
   height: 40,
   fontSize: 18,
   textAlign: 'left',
   borderColor: '#d9d9d9',
   borderBottomWidth: 1,
   color:"black"
  },
  ingredientWrap:{
    flex:1,
    backgroundColor: 'red',
  },
  ingWrap:{
    position: 'absolute',
    zIndex: 3000,
    bottom: 15,
    right: 15,
  },
  ingListButton:{
    paddingVertical: 15,
    borderRadius: 30,
    backgroundColor: Colors.buttonColor,
    paddingHorizontal: 15,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
})

export default NewMeal
