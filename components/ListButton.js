// A custom button for the bottomnavigator, to make it more sexy
import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, TouchableHighlight, Animated, Vibration } from 'react-native'
import { Ionicons, MaterialIcons, FontAwesome5, Feather } from '@expo/vector-icons';
import Colors from '../constants/Colors'
import * as Haptics from 'expo-haptics';

const {width,height} = Dimensions.get('window')

const breakfast = require('../assets/breakfast.png')
const lunch = require('../assets/lunchbox.png')
const dinner = require('../assets/fast-food.png')
const snacks = require('../assets/snacks.png')

export default class ListButton extends React.Component {
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

    const modalY = this.mode.interpolate({
     inputRange: [0, 1],
     outputRange: [0, -height / 1.2]
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
      <View style={{position: 'absolute', bottom: 60, right: 70}}>

        <Animated.View style={[styles.modal, {top: modalY, height: heightModal, width: widthModal, opacity: modalOpacity}]}>

        </Animated.View>

        <Animated.View style={[styles.button, {backgroundColor: Colors.buttonColor}]}>
          <TouchableHighlight
            style={{width: "100%", height: '100%', justifyContent: 'center', alignItems: 'center'}}
            onPress={this.handlePress} underlayColor="transparent">
              <Animated.View style={{ transform: [{ rotate: rotation }] }}>
                  <MaterialIcons name="list" size={32} color="#000" />
              </Animated.View>
          </TouchableHighlight>
        </Animated.View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  rowWrap:{
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  mealWrapper:{
    justifyContent: 'center',
    alignItems: 'center'
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
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 36,
    position: 'absolute',
    zIndex: 1000,
    top: -13,
    shadowRadius: 5,
    shadowOffset: {height:5},
    shadowOpacity: 0.3,
  },
  modal: {
    position: "absolute",
    right: -70,
    backgroundColor: 'rgba(58,90,140,.96)'
  }
})
