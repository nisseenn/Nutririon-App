import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store'
import {Provider} from "react-redux";

import SignupScreen from '../../screens/SignupScreen'

//create mockStore
let mockStore;
//create Obj for config store
const mockStoreConf = configureStore([]);
//configure store (add states)
mockStore = mockStoreConf({});


//create navigation params
const props = {getParam: (param) => {
            if (param === 'gender') return 'Male';
            if (param === 'work') return 'Physical Hard Work';
            if (param === 'freetime') return 'Very Active';
            if (param === 'age') return 25}};

//Mock Icon causing rendering error
jest.mock('@expo/vector-icons', () => {
  const { View } = require('react-native');
  return {
    MaterialIcons: View,
    Ionicons: View,
    FontAwesome: View,
  };
});


it('SignupScreen renders correctly', () => {

const tree = renderer.create(
      <Provider store={mockStore}>
        <SignupScreen navigation = { props }/>
      </Provider>
    );
expect(tree).toMatchSnapshot();
});