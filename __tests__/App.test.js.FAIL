import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store'
import {Provider} from "react-redux";

import App from '../App'

//create mockStore
let mockStore;
//create Obj for config store
const mockStoreConf = configureStore([]);
//configure store (add states)
mockStore = mockStoreConf({});


//Mock Icon causing rendering error
jest.mock('@expo/vector-icons', () => {
  const { View } = require('react-native');
  return {
    MaterialIcons: View,
    Ionicons: View,
  };
});

//Mock Icon causing rendering error
jest.mock('react-native-paper', () => {
  const { View } = require('react-native');
  return {
    RadioButton: View,
    Checkbox: View,
  };
});


it('App renders correctly', () => {

jest.useFakeTimers();

const tree = renderer.create(
      <Provider store={mockStore}>
        <App />
      </Provider>
    );
expect(tree).toMatchSnapshot();
});