import { AsyncStorage } from 'react-native'
import firebase from 'firebase';

export const ADD_MEAL = 'ADD_MEAL'
export const SET_USERMEAL = 'SET_USERMEAL'
export const SET_SUGGESTION = 'SET_SUGGESTION'
export const SET_INGREDIENTS = 'SET_INGREDIENTS'
export const ADD_INGREDIENT =  'ADD_INGREDIENT'

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
      let foodGroups = []

      if(userData.preference === "vegeterianer"){
        vegeterianer = true
        foodGroups = ["1","2","5","6","7","8"]
      }
      if(userData.preference === "vegan"){
        vegan = true
        foodGroups = ["5","6","7"]
      }
      if(userData.preference === "pesc"){
        pesc = true
        foodGroups = ["1","2","4","5","6","7","8"]
      }

      const filteredIngredients = [];

      for(const key in resData){
        const mainCategory = resData[key].groupId.split('.')[0]

        if(foodGroups.includes(mainCategory)){
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
