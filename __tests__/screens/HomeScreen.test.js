import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store'
import {Provider} from "react-redux";

import HomeScreen from '../../screens/HomeScreen'

//create state
let initialState = {
   "nutrition" : {
     "caloryRef" : null,
     "nutrients" : {
       "protein" : null,
       "fat" : null,
       "carbs" : null
     },
     "todayMeal" : {
       "Breakfast" : null,
       "Lunch" : null,
       "Dinner" : null,
       "Snacks" : null
     },
     "nutrientSuggestions" : null,
     "calorySuggestion" : null,
     "weekSummary" : [{
       "protein" : 0,
       "fat" : 0,
       "carbs" : 0,
       "cals" : 0
     }]
   }
}
//create Obj for config store
const mockStoreConf = configureStore([]);

jest.useFakeTimers();

it('HomeScreen renders correctly', async () => {

  //configure store (add states)
  let mockStore = mockStoreConf(initialState);

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