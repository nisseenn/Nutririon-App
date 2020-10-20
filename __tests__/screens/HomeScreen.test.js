import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store'
import {Provider} from "react-redux";

import HomeScreen from '../../screens/HomeScreen'

//create mockStore
let mockStore;
//create Obj for config store
const mockStoreConf = configureStore([]);

jest.useFakeTimers();

it('HomeScreen renders correctly', async () => {

  //configure store (add states)
  mockStore = mockStoreConf({});

  const tree = await renderer.create(
        <Provider store={mockStore}>
          <HomeScreen />
        </Provider>
      );
  expect(tree).toMatchSnapshot();
});


/*
it('ENZYME snapshot', () => {
  const tree = mount(<HomeScreen />);
  expect(toJson(tree)).toMatchSnapshot()
});
*/


//pass without warning