import { ADD_MEAL } from '../actions/nutrition'
import { SET_USERMEAL } from '../actions/nutrition'
import { SET_SUGGESTION } from '../actions/nutrition'
import { SET_INGREDIENTS } from '../actions/nutrition'
import { ADD_INGREDIENT } from '../actions/nutrition'
import { DELETE_INGREDIENT } from '../actions/nutrition'

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
      return { ...state, mealIngredients: [] }

    case SET_SUGGESTION:


    case SET_USERMEAL:


    case ADD_INGREDIENT:
      //Finding the ingredient we want to add
      const ingredientToAdd = state.ingredients.find(ingredient => ingredient.id === action.ingredientId);
      // const isInList = state.mealIngredients.some(ingredient => ingredient === ingredientToAdd);
      return { ...state, mealIngredients: state.mealIngredients.concat(ingredientToAdd) }

    case DELETE_INGREDIENT:
      //Finding the ingredient in the list of ingredients in user meal
      const ingredientToRemove = state.mealIngredients.find(ingredient => ingredient.id === action.ingredientId);
      //Creating a replica of the state, to not mutate state directyl, (cuz dats bad man)
      const ingredientHolder = [...state.mealIngredients]
      //Getting the index of the ingredient we want to delete
      const updatedIndex = ingredientHolder.findIndex(ingredient => ingredient.id === ingredientToRemove.id)
      //Removing the index matching out ingredient from out replicated state
      ingredientHolder.splice(updatedIndex, 1)
      //Returning a object with the new state for ingredient
      return { ...state, mealIngredients: ingredientHolder }
  }
  return state;
}

export default nutritionReducer
