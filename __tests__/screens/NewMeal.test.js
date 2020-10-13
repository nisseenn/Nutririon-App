import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store'
import {Provider} from "react-redux";

import NewMeal from '../../screens/NewMeal'



//create mockStore
let mockStore;
//create Obj for config store
const mockStoreConf = configureStore([]);


beforeAll( () => { 
  jest.useFakeTimers() 
});



it('NewMeal renders correctly', () => {

  //configure store (add states)
  mockStore = mockStoreConf({});

  const tree = renderer.create(
        <Provider store={mockStore}>
          <NewMeal />
        </Provider>
      );
  expect(tree).toMatchSnapshot();
});