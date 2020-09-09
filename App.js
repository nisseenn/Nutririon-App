import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
//Importing redux Thunk, which will be used as middleware in Redux
import ReduxThunk from 'redux-thunk'

//Importing the authreducer (not active yet)
import authReducer from './store/reducers/auth'
//importing our main navigator
import MainNavigator from './navigation/MainNavigation'

//Creating a root reducer, where we use combine reducers to be able to have multiple reducers.
//We will also have a reducer for all the rest
const rootReducer = combineReducers({
  auth: authReducer
});

//Creating the redux store with the rootReducer and defining to use redux thunk to dispatch
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
//Exporting the component with Redux provider wrapping the navigation
export default function App() {
  const getPictures = async() => {
    const startimage = await require('./assets/startimg.jpg')
  }

  //Getting pictures for the StartScreen
  useEffect(() => {
    getPictures()
  })
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
