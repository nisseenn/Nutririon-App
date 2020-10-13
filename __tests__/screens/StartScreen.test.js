import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store'
import {Provider} from "react-redux";

import StartScreen from '../../screens/StartScreen'

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
    FontAwesome: View,
  };
});


it('StartScreen renders correctly', () => {

const tree = renderer.create(
      <Provider store={mockStore}>
        <StartScreen />
      </Provider>
    );
expect(tree).toMatchSnapshot();
});