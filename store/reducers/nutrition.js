import { ADD_MEAL } from '../actions/nutrition'
import { SET_USERMEAL } from '../actions/nutrition'
import { SET_SUGGESTION } from '../actions/nutrition'
import { SET_INGREDIENTS } from '../actions/nutrition'
import { ADD_INGREDIENT } from '../actions/nutrition'

const initialState = {
  ingredients: [],
  foodSuggestions: [],
  userMeals: [],
  calorySuggestion: null,
  mealIngredients: []
}

const nutritionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INGREDIENTS:
      return { ingredients: action.ingredients, mealIngredients: action.mealIngredients }

    case ADD_MEAL:


    case SET_SUGGESTION:


    case SET_USERMEAL:


    case ADD_INGREDIENT:
      const ingredientToAdd = state.ingredients.find(ingredient => ingredient.id === action.ingredientId);
      // const isInList = state.mealIngredients.some(ingredient => ingredient === ingredientToAdd);
      return { ...state, mealIngredients: state.mealIngredients.concat(ingredientToAdd) }
  }
  return state;
}

export default nutritionReducer
