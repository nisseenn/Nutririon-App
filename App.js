import React, { useEffect, useState } from 'react';
import { StyleSheet} from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { AppLoading } from 'expo';
//Importing redux Thunk, which will be used as middleware in Redux
import ReduxThunk from 'redux-thunk'

//Importing the authreducer (not active yet)
import authReducer from './store/reducers/auth'
//Importing nutritionReducer
import nutritionReducer from './store/reducers/nutrition'
//importing our main navigator
import MainNavigator from './navigation/MainNavigation'

//Creating a root reducer, where we use combine reducers to be able to have multiple reducers.
//We will also have a reducer for all the rest
const rootReducer = combineReducers({
  nutrition: nutritionReducer,
  auth: authReducer
});

//Creating the redux store with the rootReducer and defining to use redux thunk to dispatch
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
//Exporting the component with Redux provider wrapping the navigation
export default function App() {
  //Creating a state which is changed when we have loaded the photos
  const [pictureLoaded, setPictureLoaded] = useState(false)

  //Creating a function to get the frontpage picture
  const getPictures = async() => {
    const startimage = await require('./assets/startimg.jpg')
    return startimage
  }

  //Getting pictures for the StartScreen before it is rendered
  useEffect(() => {
    getPictures()
  })
  //If the pictures is yet not loaded and the app is loading
  if (!pictureLoaded) {
    return (
      <AppLoading
        //Get the pictures loaded fast af
        startAsync={getPictures}
        //Set state to true once we retrieved the photos
        onFinish={() => {
          setPictureLoaded(true)
        }}
      />
    );
  }
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}

//Some styles ofc
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
