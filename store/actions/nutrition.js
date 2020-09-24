import { AsyncStorage } from 'react-native'
import firebase from 'firebase';

export const ADD_MEAL = 'ADD_MEAL'
export const SET_USERMEAL = 'SET_USERMEAL'
export const SET_SUGGESTION = 'SET_SUGGESTION'
export const SET_INGREDIENTS = 'SET_INGREDIENTS'

export const fetchIngredients = () => {
  return async(dispatch, getState) => {
    const userId = getState().auth.userId
    const token = getState().auth.token
    try {
      const userResponse = await fetch(`https://nutrition-1cf49.firebaseio.com/users/${userId}.json?auth=${token}`);
      const response = await fetch(`https://nutrition-1cf49.firebaseio.com/foods.json?auth=${token}`);

      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      if (!userResponse.ok) {
        throw new Error('Something went wrong');
      }

      const userData = await userResponse.json()
      const resData = await response.json();

      let vegeterianer = false
      let vegan = false
      let pesc = false

      if(userData.preference === "vegeterianer"){
        vegeterianer = true
      }
      if(userData.preference === "vegan"){
        vegan = true
      }
      if(userData.preference === "pesc"){
        pesc = true
      }

      const filteredIngredients = [];

      for(const key in resData){
        if(vegeterianer && resData[key].vegeterianer){
          filteredIngredients.push(resData[key])
        }
        if(vegan && resData[key].vegan){
          filteredIngredients.push(resData[key])
        }
        if(pesc && resData[key].pesc){
          filteredIngredients.push(resData[key])
        }
      }

      dispatch({ type: SET_INGREDIENTS, ingredients: filteredIngredients })

    } catch (error) {
      throw new Error('error', error);
    }
  }
}

export const fetchUserMeals = () => {
  return async(dispatch, getState) => {

  }
}

export const fetchMealSuggestion = () => {
  return async(dispatch, getState) => {

  }
}

export const addMeal = () => {
  return async(dispatch, getState) => {

  }
}
