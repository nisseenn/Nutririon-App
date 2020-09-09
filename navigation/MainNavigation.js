//Importing react components
import React from 'react'
import { View, Text, Button, Platform } from 'react-native'
//Importing react navigation components to create a bottom tab navigator
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
//Importing iconsetß
import { Ionicons } from '@expo/vector-icons';

//Importing the other screens/components
import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen'
import StartScreen from '../screens/StartScreen'
import NewMeal from '../screens/NewMeal'
import HomeScreen from '../screens/HomeScreen'
import ProfileScreen from '../screens/ProfileScreen'

//Creating the content for the bottom tab navigator
const tabScreenConfig = {
    //Defining a tab in the bottom
    Home: {
      //Which component is the tab pointing to
      screen: HomeScreen,
      //Some options to tweak the tabbar as we want
      navigationOptions:{
        //Put a nice icon in there
        tabBarIcon: () => {
            return <Ionicons name="ios-home" size={24}/>
          },
          //Setting the color
          tabBarColor: '#45b993'
      }
    },
    //repeat
    New: {
      screen: NewMeal,
      navigationOptions:{
        tabBarIcon: () => {
            return <Ionicons name="ios-add" size={30}/>
          },
          tabBarColor: '#52bf91'
      }
    },
    //repeat
    Profile: {
      screen: ProfileScreen,
      navigationOptions:{
        tabBarIcon: () => {
          return <Ionicons name="ios-person" size={24}/>
        },
        tabBarColor: '#50bd9d'
      }
    },
  }

//Defining the bottom navigator with the help of createMaterialBottomTabNavigator, first argument is the config we defined beofre
//second is some navigationoptions for the tabbar
const BottomNavigator = createMaterialBottomTabNavigator(tabScreenConfig, {
  initialRouteName: 'Home',
      activeColor: '#000',
      inactiveColor: '#3e2465',
      barStyle: { backgroundColor: '#4baea0' },
      //makes the sexy color change possible
      shifting: true
});
//Creating a stacknavigator for authentication
const AuthNavigator = createStackNavigator({
  start: StartScreen,
  login: LoginScreen,
  signup: SignupScreen
})
//creating a switchnavigator which is temporary set to shop first,
//auth will be on top in production
const MainNavigator = createSwitchNavigator({
    Auth: AuthNavigator,
    Main: BottomNavigator,
})
//defining a var storing the main navigator
let Navigation = createAppContainer(MainNavigator);
//Exporting the navigator
export default () => <Navigation />
