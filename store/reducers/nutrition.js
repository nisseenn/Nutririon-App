import { ADD_MEAL } from '../actions/nutrition'
import { SET_USERMEAL } from '../actions/nutrition'
import { SET_SUGGESTION } from '../actions/nutrition'
import { SET_INGREDIENTS } from '../actions/nutrition'

const initialState = {
  ingredients: [],
  foodSuggestions: [],
  userMeals: [],
  calorySuggestion: null,
}

const nutritionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INGREDIENTS:
      return {...state, ingredients: action.ingredients}

    case ADD_MEAL:


    case SET_SUGGESTION:


    case SET_USERMEAL:

  }
  return state;
}

export default nutritionReducer
