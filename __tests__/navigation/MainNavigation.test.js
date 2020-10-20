import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store'
import {Provider} from "react-redux";

import Navigation from "../../Navigation/MainNavigation"

//create mockStore
let mockStore;
//create Obj for config store
const mockStoreConf = configureStore([]);

jest.useFakeTimers();

it('renders the component', () => {


  //configure store (add states)
  mockStore = mockStoreConf({});

    const tree = renderer.create(
              <Provider store = { mockStore }>
                <Navigation />
              </Provider>);

    expect(tree).toMatchSnapshot();
});
