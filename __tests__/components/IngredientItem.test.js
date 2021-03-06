import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store'
import {Provider} from "react-redux";

import IngredientItem from "../../components/IngredientItem"

const initialState = {
    "nutrition" : {
        "mealIngredients" : ["food1", "food2"]
    }
}

//create mockStore
let mockStore;
//create Obj for config store
const mockStoreConf = configureStore([]);

jest.useFakeTimers();

describe('IngredientItem', ()=>{
    it('renders the component', async () => {

        //configure store (add states)
        mockStore = mockStoreConf({});

        const tree = await renderer.create(
        <Provider store={mockStore}>
          <IngredientItem />
        </Provider>
      );
        expect(tree).toMatchSnapshot();
    });
});