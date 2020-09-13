//Importing react components
import React from 'react'
import { View, Text, Button, Platform } from 'react-native'
//Importing react navigation components to create a bottom tab navigator
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
//Importing iconsetß
import { Ionicons, AntDesign } from '@expo/vector-icons';

import Colors from '../constants/Colors'

//Importing the other screens/components
import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen'
import StartScreen from '../screens/StartScreen'
import NewMeal from '../screens/NewMeal'
import HomeScreen from '../screens/HomeScreen'
import ProfileScreen from '../screens/ProfileScreen'
import GenderScreen from '../screens/GenderScreen'
import PersonalInfoScreen from '../screens/PersonalInfoScreen'
import PreferencesScreen from '../screens/PreferencesScreen'
import SignUpMethodScreen from '../screens/SignUpMethodScreen'
import StartUpScreen from '../screens/StartUpScreen'
import AddButton from '../components/AddButton'

//Creating the content for the bottom tab navigator
const tabScreenConfig = {
    //Defining a tab in the bottom
    Home: {
      //Which component is the tab pointing to
      screen: HomeScreen,
      //Some options to tweak the tabbar as we want
      navigationOptions:{
        //Put a nice icon in there, we also give color as parameter
        //This allows us to use tintColor when icon is pressed. Eg. the icon changes color on press
        tabBarIcon: (color) => {
            return <AntDesign name="home" size={24} color={color.tintColor}/>
          },
          //Setting the color
          tabBarColor: '#45b993'
      }
    },
    //repeat
    New: {
      screen: NewMeal,
      navigationOptions:{
        tabBarIcon: (color) => {
            //Rendering our new sexy add button
            return <AddButton color={color.tintColor}/>
          },
          title: '',
      }
    },
    //repeat
    Profile: {
      screen: ProfileScreen,
      navigationOptions:{
        tabBarIcon: (color) => {
          return <AntDesign name="user" size={24} color={color.tintColor}/>
        },
      }
    },
  }

//Defining the bottom navigator with the help of createMaterialBottomTabNavigator, first argument is the config we defined beofre
//second is some navigationoptions for the tabbar
const BottomNavigator = createMaterialBottomTabNavigator(tabScreenConfig, {
  initialRouteName: 'Home',
      activeColor: '#fff',
      inactiveColor: Colors.iconColor,
      barStyle: { backgroundColor: Colors.primaryColor },
      //makes the sexy color change possible
});

const signUpNavigator = createStackNavigator({
  gender: GenderScreen,
  info: PersonalInfoScreen,
  preferences: PreferencesScreen,
  method: SignUpMethodScreen,
  start: SignupScreen,
})

//Creating a stacknavigator for authentication
const AuthNavigator = createStackNavigator({
  start: StartScreen,
  login: LoginScreen,
  signup: {
  screen: signUpNavigator,
  navigationOptions: () => ({
    headerShown: false
  }),
}
})

//creating a switchnavigator which is temporary set to shop first,
//auth will be on top in production
const MainNavigator = createSwitchNavigator({
    Start: StartUpScreen,
    Auth: AuthNavigator,
    Main: BottomNavigator,
})
//defining a var storing the main navigator
let Navigation = createAppContainer(MainNavigator);
//Exporting the navigator
export default () => <Navigation />
