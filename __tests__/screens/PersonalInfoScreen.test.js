import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store'
import {Provider} from "react-redux";

import PersonalInfoScreen from '../../screens/PersonalInfoScreen'


//create mockStore
let mockStore;
//create Obj for config store
const mockStoreConf = configureStore([]);

//create navigation params
const props = {getParam: (param) => {
            if (param === 'gender') return 'Male';
            if (param === 'work') return 'Physical Hard Work';
            if (param === 'freetime') return 'Very Active'}};


//Icon results in error, mock it out
jest.mock('@expo/vector-icons', () => {
  const { View } = require('react-native');
  return {
    MaterialIcons: View,
    Ionicons: View,
  };
});


it('PersonalInfoScreen renders correctly', () => {

//configure store (add states)
mockStore = mockStoreConf({});

const tree = renderer.create(
      <Provider store={mockStore}>
        <PersonalInfoScreen navigation={ props }/>
      </Provider>
    );
expect(tree).toMatchSnapshot();
});