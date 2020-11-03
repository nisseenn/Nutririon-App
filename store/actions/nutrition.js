import { AsyncStorage } from 'react-native'
import firebase from 'firebase';

import STRINGS from '../../constants/Strings'

export const ADD_MEAL = 'ADD_MEAL'
export const SET_USERMEAL = 'SET_USERMEAL'
export const SET_SUGGESTION = 'SET_SUGGESTION'
export const SET_INGREDIENTS = 'SET_INGREDIENTS'
export const ADD_INGREDIENT =  'ADD_INGREDIENT'
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT'

export const fetchIngredients = () => {
  return async(dispatch, getState) => {
    const userId = getState().auth.userId
    const token = getState().auth.token
    const preference = getState().auth.preference
    const freetime = getState().auth.freetime
    const work = getState().auth.work
    const age = getState().auth.age
    const gender = getState().auth.gender

    const updatedIngredients = getState().nutrition["mealIngredients"].map(prod => prod);

    try {
      const userResponse = await fetch(`https://nutrition-1cf49.firebaseio.com/users/${userId}.json?auth=${token}`);
      const response = await fetch(`https://nutrition-1cf49.firebaseio.com/foods.json?auth=${token}`);
      const userNutrition = await fetch(`https://nutrition-1cf49.firebaseio.com/userMeals/${userId}.json?auth=${token}`)

      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      if (!userResponse.ok) {
        throw new Error('Something went wrong');
      }
      if (!userNutrition.ok) {
        throw new Error('Something went wrong');
      }

      const userData = await userResponse.json()
      const resData = await response.json();
      const mealData = await userNutrition.json()

      const nutritionData = Object.values(mealData)

      let foodGroups = []

      // Vegeterian
      if(userData.preference === STRINGS.preference[1]){
        foodGroups = ["1","2","5","6","7","8"]
      }
      // Vegan
      if(userData.preference === STRINGS.preference[2]){
        foodGroups = ["5","6","7"]
      }
      // Pesceterian
      if(userData.preference === STRINGS.preference[3]){
        foodGroups = ["1","2","4","5","6","7","8"]
      }
      // None
      if(userData.preference == STRINGS.preference[0]){
        foodGroups = ["1","2","3","4","5","6","7","8","9","10","11"]
      }

      const filteredIngredients = [];

      for(const key in resData){
        const mainCategory = resData[key].groupId.split('.')[0]

        if(foodGroups.includes(mainCategory)){
          filteredIngredients.push(resData[key])
        }
      }

      dispatch({ type: SET_INGREDIENTS, ingredients: filteredIngredients, mealIngredients: updatedIngredients, nutritientSuggestions: nutritionData, preference: preference, work: work, freetime: freetime, age: age, gender: gender })

    } catch (error) {
      throw new Error('error', error);
    }
  }
}
//Function to handle adding ingredients to the meal
export const addIngredient = (ingredientId) => {
    return { type: ADD_INGREDIENT, ingredientId: ingredientId }
}
//Function to handle deleting ingredients in a meal
export const deleteIngredient = (ingredientId) => {
    return { type: DELETE_INGREDIENT, ingredientId: ingredientId }
}

export const fetchUserMeals = () => {
  return async(dispatch, getState) => {

  }
}

export const fetchNutritientSuggestion = () => {
  return async(dispatch, getState) => {

  }
}

export const addMeal = (mealType) => {
  return async(dispatch, getState) => {
    const userId = getState().auth.userId
    const token = getState().auth.token
    const ingredients = getState().nutrition.mealIngredients

    let date = new Date();
    const timestamp = {
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear()
    }

    try {
      const response = await fetch(`https://nutrition-1cf49.firebaseio.com/userMeals/${userId}.json?auth=${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ingredients,
          timestamp,
          mealType
        })
      });

      dispatch({ type: ADD_MEAL })

    } catch (error) {
      console.log(error);
    }
  }
}
