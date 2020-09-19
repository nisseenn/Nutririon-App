import { ADD_MEAL } from '../actions/nutrition'
import { SET_USERMEAL } from '../actions/nutrition'
import { SET_SUGGESTION } from '../actions/nutrition'

const initialState = {
  foodSuggestions: [],
  userMeals: [],
  calorySuggestion: null,
}

const nutritionReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MEAL:
      console.log(action);

    case SET_SUGGESTION:
      console.log(action);

    case SET_USERMEAL:
      console.log(action);
  }
  return state;
}

export default nutritionReducer
