// A custom button for the bottomnavigator, to make it more sexy
import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, TouchableHighlight, Animated } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import COLORS from '../constants/Colors'
import * as Haptics from 'expo-haptics';
import TouchableWorkaround from '../components/TouchableOpacityWorkaround'


const {width,height} = Dimensions.get('window')

const breakfast = require('../assets/breakfast.png')
const lunch = require('../assets/lunchbox.png')
const dinner = require('../assets/fast-food.png')
const snacks = require('../assets/snacks.png')





export default class AddButton extends React.Component {
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
      outputRange: ["0deg", "45deg"]
    });

    const modalY = this.mode.interpolate({
     inputRange: [0, 1],
     outputRange: [0, - height / 2 - 17]
    });

   const heightModal = this.mode.interpolate({
    inputRange: [0, 1],
    outputRange: [0, height / 2]
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
      <View style={{position: 'absolute', alignItems: 'center', justifyContent: 'center'}}>

        <Animated.View
          useNativeDriver={true}
          style={[styles.modal, {top: modalY, height: heightModal, width: widthModal, opacity: modalOpacity}]}>

          <Text style={styles.modalTitle}>Add a meal</Text>
          <View style={styles.rowWrap}>
            <Animated.View
              useNativeDriver={true}
              style={[styles.mealWrapper, {opacity: modalOpacity}]}>
              <TouchableWorkaround onPress={() => {
                this.handlePress()
                this.props.navigation.navigate("mealStart", {
                  meal: 'Breakfast'
                })
              }}>
                   <Image source={breakfast} style={styles.image}/>
                   <Text style={styles.mealTitle}>Breakfast</Text>
              </TouchableWorkaround>
             </Animated.View>

             <Animated.View
              useNativeDriver={true}
              style={[styles.mealWrapper, {opacity: modalOpacity}]}>
              <TouchableWorkaround onPress={() => {
                this.handlePress()
                this.props.navigation.navigate("mealStart", {
                  meal: 'Lunch'
                })
              }}>
                    <Image source={lunch} style={styles.image}/>
                    <Text style={styles.mealTitle}>Lunch</Text>
                </TouchableWorkaround>
              </Animated.View>
          </View>

          <View style={styles.rowWrap}>
            <Animated.View
              useNativeDriver={true}
              style={[styles.mealWrapper, {opacity: modalOpacity}]}>
              <TouchableWorkaround onPress={() => {
                this.handlePress()
                this.props.navigation.navigate("mealStart", {
                  meal: 'Dinner'
                })
              }}>
                 <Image source={dinner} style={styles.image}/>
                 <Text style={styles.mealTitle}>Dinner</Text>
               </TouchableWorkaround>
             </Animated.View>

             <Animated.View
               useNativeDriver={true}
               style={[styles.mealWrapper, {opacity: modalOpacity}]}>
               <TouchableWorkaround onPress={() => {
                 this.handlePress()
                 this.props.navigation.navigate("mealStart", {
                   meal: 'Snacks'
                 })
               }}>
                  <Image source={snacks} style={styles.image}/>
                  <Text style={styles.mealTitle}>Snacks</Text>
                </TouchableWorkaround>
              </Animated.View>
          </View>

        </Animated.View>

        <Animated.View
          useNativeDriver={true}
          style={[styles.button, {backgroundColor: COLORS.buttonColor}]}>
          <TouchableHighlight
            style={{width: "100%", height: '100%', justifyContent: 'center', alignItems: 'center'}}
            onPress={this.handlePress} underlayColor="transparent">
              <Animated.View style={{ transform: [{ rotate: rotation }] }}>
                  <FontAwesome5 name="plus" size={24} color="#FFF" />
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
  modalTitle:{
    fontSize: 22,
    color: "#fff",
    fontWeight: '600',
    width: '100%',
    textAlign: 'center',
    marginTop: 20
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
    width: 50,
    height: 50,
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
    backgroundColor: 'rgba(58,90,140,.96)',
    elevation: 3,
  }
})
