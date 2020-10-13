import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store'
import {Provider} from "react-redux";

import SignUpMethodScreen from '../../screens/SignUpMethodScreen'

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


it('SignUpMethodScreen renders correctly', () => {

const tree = renderer.create(
      <Provider store={mockStore}>
        <SignUpMethodScreen navigation = { props }/>
      </Provider>
    );
expect(tree).toMatchSnapshot();
});