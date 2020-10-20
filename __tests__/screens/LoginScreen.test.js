import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store'
import {Provider} from "react-redux";

import LoginScreen from '../../screens/LoginScreen'

//create mockStore
let mockStore;
//create Obj for config store
const mockStoreConf = configureStore([]);

//beforeEach( () => { 
  //jest.useFakeTimers() 
//});

//Icon results in error, mock it out
jest.mock('@expo/vector-icons', () => {
  const { View } = require('react-native');
  return {
    MaterialIcons: View,
    Ionicons: View,
  };
});

it('LoginScreen renders correctly', async () => {
  //configure store (add states)
  mockStore = mockStoreConf({});
  
  const tree = await renderer.create(
        <Provider store={mockStore}>
          <LoginScreen />
        </Provider>  
  );
  expect(tree).toMatchSnapshot();
});