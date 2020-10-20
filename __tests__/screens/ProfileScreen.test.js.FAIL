import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store'
import {Provider} from "react-redux";

import ProfileScreen from '../../screens/ProfileScreen'

//create mockStore
let mockStore;
//create Obj for config store
const mockStoreConf = configureStore([]);
//configure store (add states)
mockStore = mockStoreConf({});


it('ProfileScreen renders correctly', () => {
const tree = renderer.create(
      <Provider store={mockStore}>
        <ProfileScreen />
      </Provider>
    );
expect(tree).toMatchSnapshot();
});