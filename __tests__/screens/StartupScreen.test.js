import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store'
import {Provider} from "react-redux";

import StartupScreen from '../../screens/StartupScreen'

//create mockStore
let mockStore;
//create Obj for config store
const mockStoreConf = configureStore([]);
//configure store (add states)
mockStore = mockStoreConf({});

it('StartupScreen renders correctly', () => {

//mock timer to handle async-storage
jest.useFakeTimers();

const tree = renderer.create(
      <Provider store={mockStore}>
        <StartupScreen />
      </Provider>
    );
expect(tree).toMatchSnapshot();
});