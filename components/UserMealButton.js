// A custom button for the bottomnavigator, to make it more sexy
import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, TouchableHighlight, Animated } from 'react-native'
import { FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import COLORS from '../constants/Colors'
import * as Haptics from 'expo-haptics';
import TouchableWorkaround from '../components/TouchableOpacityWorkaround'
import UserMealList from './UserMealList'

const breakfast = require('../assets/breakfast.png')
const lunch = require('../assets/lunchbox.png')
const dinner = require('../assets/fast-food.png')
const snacks = require('../assets/snacks.png')

const {width,height} = Dimensions.get('window')

export default class UserMealButton extends React.Component {
  mode = new Animated.Value(0);
  constructor(props) {
    super(props);
      this.state = {

      };
  }

  handlePress = () => {
    // Some feedback when pressing the button
    const feedback = Haptics.ImpactFeedbackStyle.Medium
    Haptics.impactAsync(feedback)
    Animated.sequence([
        Animated.timing(this.mode, {
            toValue: this.mode._value === 0 ? 1 : 0,
            useNativeDriver: false,
            duration: 100
        }),
    ]).start();
  };

  render(){

    const rotation = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "90deg"]
    });

    const rotation2 = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: ["90deg", "0deg"]
    });

    const iconOpacity = this.mode.interpolate({
     inputRange: [0, 1],
     outputRange: [1, 0]
     });

     const iconOpacity2 = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
      });

    const modalY = this.mode.interpolate({
     inputRange: [0, 1],
     outputRange: [0, 0]
    });

   const heightModal = this.mode.interpolate({
    inputRange: [0, 1],
    outputRange: [0, height]
    });

    const widthModal = this.mode.interpolate({
     inputRange: [0, 1],
     outputRange: [50, width + 1]
     });

    const modalOpacity = this.mode.interpolate({
     inputRange: [0, 1],
     outputRange: [0, 1]
     });

    return(
      <View style={{}}>

        <Animated.View
          useNativeDriver={true}
          style={[styles.modal, {top: modalY, height: heightModal, width: widthModal, opacity: modalOpacity}]}>

          <View style={styles.rowWrap}>
            <UserMealList />
          </View>

        </Animated.View>


        <Animated.View
          useNativeDriver={true}
          style={[styles.button, {backgroundColor: COLORS.buttonColor}]}>

          <TouchableOpacity
            activeOpacity={.9}
            onPress={this.handlePress}
            style={{width: "100%", height: '100%', justifyContent: 'center', alignItems: 'center'}}
            underlayColor="transparent">

              <Animated.View
                  useNativeDriver={true}
                  style={{ transform: [{ rotate: rotation }], opacity: iconOpacity, position: 'absolute'}}>
                  <MaterialCommunityIcons name="food-variant" size={32} color="#fff"/>
              </Animated.View>

              <Animated.View
                  useNativeDriver={true}
                  style={{ transform: [{ rotate: rotation2 }], opacity: iconOpacity2, position: 'absolute'}}>
                  <MaterialIcons name="close" size={32} color="#fff"/>
              </Animated.View>

          </TouchableOpacity>

          {/* <TouchableHighlight
            style={{width: "100%", height: '100%', justifyContent: 'center', alignItems: 'center'}}
            onPress={this.handlePress} underlayColor="transparent">
              <Animated.View style={{ transform: [{ rotate: rotation }] }}>
                  <MaterialCommunityIcons name="food-variant" size={36} color="white"/>
              </Animated.View>
          </TouchableHighlight> */}

        </Animated.View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  rowWrap:{
    flexDirection: 'row',
    justifyContent: 'center',
    // alignItems: 'center'
  },
  mealWrapper:{
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  image:{
    width: 80,
    height: 80
  },
  mealTitle:{
    fontSize: 18,
    color: "#fff",
    fontWeight: '600',
    marginTop: 10,
    textAlign: 'center'
  },
  button:{
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.buttonColor,
    width: 55,
    height: 55,
    borderRadius: 100,
    top: 50,
    right: 20,
    shadowRadius: 5,
    shadowOffset: {height:5},
    shadowOpacity: 0.3,
  },
  modal: {
    position: "absolute",
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(58,90,140,.96)',
    elevation: 3,
    right:0,
  }
})
