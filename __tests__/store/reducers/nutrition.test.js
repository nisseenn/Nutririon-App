import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nut from '../../../store/reducers/nutrition';

const state = {
  ingredients: ['ingredient1', 'ingredient2'],
  foodSuggestions: ['food1', 'food2'],
  userMeals: ['meal1', 'meal2'],
  calorySuggestion: 100,
  mealIngredients: ['mealIngredient1', 'mealIngredient2']
}


describe('NUTRITION REDUCER', () => {

    it('DEFAULT should return state', ()=> {
        const action = { type: 'no_action'};

        expect(nut(state, action)).toEqual(state);
    });


    it('SET_INGREDIENTS should return state with updated ingredients from action ', () => {
        const action = { type: 'SET_INGREDIENTS',
            ingredients: ['new_ingr1', 'new_ingr2'],
            mealIngredients: ['new_mealIngr1', 'new_mealIngr2']};

        expect(nut(state, action)).not.toEqual(state);
        expect(nut(state, action)).toEqual({ingredients: ['new_ingr1','new_ingr2'], 
                        mealIngredients: ['new_mealIngr1', 'new_mealIngr2']
                        });
    });

    it('ADD_MEAL should return state', () => {
        const action = { type: 'ADD_MEAL'}
    
        expect(nut(state, action)).toEqual(state, mealIngredients['mealIngredient1', 'mealIngredient2']);
    });


    it('SET_SUGGESTION is empty and should return state', () => {
        const action = { type: 'SET_SUGGESTION'}
    
        expect(nut(state, action)).toEqual(state);
    });


    it('SET_USERMEAL is empty and should return state', () => {
        const action = { type: 'SET_USERMEAL'}
    
        expect(nut(state, action)).toEqual(state);
    });

    it('ADD_INGREDIENT', () => {
        const action = { type: 'ADD_INGREDIENT',
            ingredientId: 123}

        expect(nut(state, action)).toEqual(state, mealIngredients)
    })

    it('DELETE_INGREDIENT', () => {
        const action = { type: 'DELETE_INGREDIENT',
                ingredientId: 123}


        expect(nut(state, action)).toEqual(state, mealIngredients)
    })


});