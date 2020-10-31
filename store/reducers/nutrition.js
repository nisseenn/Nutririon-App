import { ADD_MEAL } from '../actions/nutrition'
import { SET_USERMEAL } from '../actions/nutrition'
import { SET_SUGGESTION } from '../actions/nutrition'
import { SET_INGREDIENTS } from '../actions/nutrition'
import { ADD_INGREDIENT } from '../actions/nutrition'
import { DELETE_INGREDIENT } from '../actions/nutrition'

const initialState = {
  ingredients: [],
  nutritientSuggestions: [],
  todayMeal: {},
  userMeals: [],
  calorySuggestion: null,
  caloryRef: null,
  nutrients: [],
  mealIngredients: []
}

const nutritionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INGREDIENTS:

      return { ...state, ingredients: action.ingredients, mealIngredients: action.mealIngredients }

    case ADD_MEAL:
      return { ...state, mealIngredients: [] }

    case SET_SUGGESTION:


    case SET_USERMEAL:
      let cals = 0
      let nutrientsTotal = 0;
      let refCals;
      let fatTotal = 0;
      let proteinTotal = 0;
      let carbsTotal = 0;
      let mealsOfDay = {}
      const preference = action.preference
      const freetime = action.freetime
      const work = action.work
      const age = parseInt(action.age)
      const gender = action.gender

      if(gender == 'male'){
        if(age > 18 && age < 30){
          if(work == 'beddriven' && freetime == 'lessactive'){
            refCals = 2006
          }
          if(work == 'sitting' && freetime == 'lessactive'){
            refCals = 2818
          }
          if(work == 'sitting' && freetime == 'active'){
            refCals = 2901
          }
          if(work == 'sitting' && freetime == 'veryactive'){
            refCals = 3228
          }
          if(work == 'standing' && freetime == 'lessactive'){
            refCals = 3167
          }
          if(work == 'standing' && freetime == 'active'){
            refCals = 3250
          }
          if(work == 'standing' && freetime == 'veryactive'){
            refCals = 3577
          }
          if(work == 'physical' && freetime == 'lessactive'){
            refCals = 3865
          }
          if(work == 'physical' && freetime == 'active'){
            refCals = 3947
          }
          if(work == 'physical' && freetime == 'veryactive'){
            refCals = 4275
          }
        }

      }

      const meals = action.nutritientSuggestions

      for(var meal = 0; meal < meals.length; meal++){
        const ingredientList = meals[meal].ingredients
        const timestamp = meals[meal].timestamp
        if(timestamp.day == action.day && timestamp.month == action.month && timestamp.year == action.year){
          for(var ingredient = 0; ingredient < ingredientList.length; ingredient++){
            const calories = ingredientList[ingredient].Energi2.split('value')[1].split('=')[1].split('}')[0]
            const fat = ingredientList[ingredient].Fett.split('value')[1].split('=')[1].split('}')[0]
            const carbs = ingredientList[ingredient].Karbo.split('value')[1].split('=')[1].split('}')[0]
            const protein = ingredientList[ingredient].Protein.split('value')[1].split('=')[1].split('}')[0]
            cals += parseInt(calories)
            nutrientsTotal = nutrientsTotal + parseInt(fat) + parseInt(carbs) + parseInt(protein)
            fatTotal += parseInt(fat)
            carbsTotal += parseInt(carbs)
            proteinTotal += parseInt(protein)
            mealsOfDay[meals[meal].mealType] = calories.split('.')[0]
          }
        }
      }

      let nutrientsObj = {
        total: nutrientsTotal,
        fat: fatTotal,
        carbs: carbsTotal,
        protein: proteinTotal
      }

      const suggestedCals = refCals - cals

      return {...state, nutritientSuggestions: action.nutritientSuggestions, calorySuggestion: suggestedCals, caloryRef: refCals, nutrients: nutrientsObj, todayMeal: mealsOfDay}

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
