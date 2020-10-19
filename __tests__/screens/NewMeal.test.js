import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store'
import {Provider} from "react-redux";
import {useSelector} from "react-redux";

import NewMeal from '../../screens/NewMeal'



//create mockStore
let mockStore;
//create Obj for config store
const mockStoreConf = configureStore([]);

//configure store (add states)
mockStore = mockStoreConf({});

beforeAll( () => { 
  jest.useFakeTimers() 
});

jest.mock("react-redux", () => ({
  useSelector: jest.fn()
}));



describe("NewMeal", () => {
  beforeEach(() => {
    useSelector.mockImplementation(callback => {
      return callback(mockAppState);
    });
  });
  afterEach(() => {
    useSelector.mockClear();
  });


  it('NewMeal renders correctly', () => {

    const tree = renderer.create(
          <Provider store={mockStore}>
            <NewMeal />
          </Provider>
        );
    expect(tree).toMatchSnapshot();
  });
});

