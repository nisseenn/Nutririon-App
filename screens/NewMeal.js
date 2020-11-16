import React, { useState, useCallback, useEffect, useRef } from 'react'
import { View, StyleSheet, FlatList, Text, ActivityIndicator, Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import * as Animatable from 'react-native-animatable';
import { SearchBar } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient'
import { MaterialIcons } from '@expo/vector-icons';

import { fetchIngredients } from '../store/actions/nutrition'
import { fetchUserMeals } from '../store/actions/nutrition'
import { addIngredient } from '../store/actions/nutrition'
import { deleteIngredient } from '../store/actions/nutrition'
import { addMeal } from '../store/actions/nutrition'

import ListButton from '../components/ListButton'
import IngredientItem from '../components/IngredientItem'
import COLORS from '../constants/Colors'

const {width,height} = Dimensions.get('window')

const NewMeal = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState()
  const [search, setSearch] = useState(null)
  const [list, setList] = useState([])
  const [ingredientList, setIngredientList] = useState([])
  //state for the "added meal" animation
  const [addAnimation, setAddAnimation] = useState(false)
  //Ref for the bouncing view
  const imageRef = useRef(null);
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
    await dispatch(addMeal(mealType))
    handleAnimation()
    dispatch(fetchIngredients())
    dispatch(fetchUserMeals())
  }

  const handleAnimation = async() => {
    await setAddAnimation(true)
    //bounce in image
    await imageRef.current.bounceIn(1000)
    //Waiting 3 sek before it bounces out again
    const startAnimation = await setTimeout(() => {
      imageRef.current.fadeOut(200)
    }, 1000)
    const endanimation = await setTimeout(() => {
      setAddAnimation(false)
    }, 1300)
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
              energi: itemData.item.energi1,
              fett: itemData.item.fat,
              protein: itemData.item.protein,
              karbo: itemData.item.carbs,
              fiber: itemData.item.fiber,
              sukker: itemData.item.sugar,
              porsjon: itemData.item.portion
            })
          }}
          onAddIngredient={() => {
            console.log('heipådeg');
            let objectReturn = addIngredient(itemData.item.id)
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
        <ActivityIndicator size="large" color={COLORS.iconColor} />
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
            colors={[COLORS.primaryColor, COLORS.accentColor]}
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
          searchIcon={{color: COLORS.iconColor}}
        />
      </View>
      <FlatList
        contentContainerStyle={{ paddingTop: 200, width: width, }}
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

      {addAnimation ? (
        <View style={styles.animationPopWrap}>
          <Animatable.View
            style={styles.popupWrap}
            ref={imageRef}
            >
            <Text style={styles.mealAnimationTitle}>Meal added!</Text>
            <Text style={styles.mealDescText}></Text>
            <MaterialIcons name="check" size={50} color="#fff"/>
          </Animatable.View>
        </View>
      ) : (
        <View>

        </View>
      )}
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
    backgroundColor: COLORS.buttonColor,
    paddingHorizontal: 15,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  animationPopWrap:{
    flex:1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 7000
  },
  popupWrap:{
    backgroundColor: "#80d0c7",
    width: width / 2,
    height: width / 2,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mealAnimationTitle:{
    color:"#fff",
    fontWeight: '600',
    fontSize: 20
  },
  mealDescText:{
    color:"#fff",
    fontWeight: '600',
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5
  }
})

export default NewMeal
