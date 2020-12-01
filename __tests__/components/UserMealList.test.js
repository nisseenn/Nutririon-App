import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store'
import {Provider} from "react-redux";
import thunk from 'redux-thunk';

import UserMealList from "../../components/UserMealList"

//create mockStore
let initialState = {
    "nutrition" : {
        "nutrientSuggestion" : "testSuggestion"
    }
};

let middlewares = [ thunk ];
let mockStoreConf = configureStore(middlewares);
//create Obj for config store


jest.useFakeTimers();

describe('UserMealList', ()=>{
    it('renders the component', async () => {

        let mockStore = mockStoreConf(initialState);

        const tree = await renderer.create(
        <Provider store={mockStore}>
          <UserMealList />
        </Provider>
      );
      
      expect(tree).toMatchSnapshot();
    });
});
