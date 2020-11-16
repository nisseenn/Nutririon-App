// A custom button for the bottomnavigator, to make it more sexy
import React from 'react'
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity, Animated } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import COLORS from '../constants/Colors'
import * as Haptics from 'expo-haptics';
import TouchableWorkaround from '../components/TouchableOpacityWorkaround'

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

  renderIngredients = (itemData) => {
    return(
      <View style={styles.container}>
        <View style={styles.rowWrap}>
          <Text style={styles.ingredientText}>
            {itemData.item.name}
          </Text>
          <TouchableWorkaround
            onPress={() => {
              this.props.deleteIngredient(itemData.item.id)
            }}
            style={styles.iconWrap}>
            <MaterialIcons style={{}} color="white" size={30} name="close"/>
          </TouchableWorkaround>
        </View>
      </View>
    )
  }

  render(){

    const rotation = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "90deg"]
    });

    const rotation2 = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: ["90deg", "0deg"]
    });

    const modalY = this.mode.interpolate({
     inputRange: [0, 1],
     outputRange: [300, -height / 1.2]
    });

    // const modalX = this.mode.interpolate({
    //  inputRange: [0, 1],
    //  outputRange: [-1000, -70]
    // });

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

     const iconOpacity = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0]
      });

      const iconOpacity2 = this.mode.interpolate({
       inputRange: [0, 1],
       outputRange: [0, 1]
       });

    return(
      <View style={{position: 'absolute', bottom: 60, right: 70}}>

        <Animated.View 
          useNativeDriver={true}
          style={[styles.modal, {top: modalY, height: heightModal, width: widthModal, opacity: modalOpacity}]}>
          <View>
            <Text style={styles.ingredientTitle}>Ingredients</Text>
          </View>
          {this.props.ingredients.length === 0 ? (
            <View style={{position: 'absolute', width: '100%', top: height / 2, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: "#fff", fontSize: 16, fontWeight: '500'}}>No ingredients added</Text>
            </View>
          ) : (
            <FlatList
              contentContainerStyle={{position: 'absolute', left: 0, top: 300, width: width}}
              scrollEventThrottle={16}
              // onRefresh={loadIngredients}
              // refreshing={isRefreshing}
              numColumns={1}
              data={this.props.ingredients}
              renderItem={this.renderIngredients}
              keyExtractor={(item, index) => item.id}
            />
          )}
          <View style={styles.doneWrap}>
            <TouchableWorkaround
              onPress={this.props.handleSubmitMeal}
              style={styles.doneButton}>
              <Text style={styles.doneText}>ADD MEAL</Text>
            </TouchableWorkaround>
          </View>

        </Animated.View>

        <Animated.View style={[styles.button, {backgroundColor: COLORS.buttonColor}]}>
          <TouchableOpacity
            style={{width: "100%", height: '100%', justifyContent: 'center', alignItems: 'center'}}
            onPress={this.handlePress} underlayColor="transparent">

              <Animated.View
                  useNativeDriver={true}
                  style={{ transform: [{ rotate: rotation }], opacity: iconOpacity, position: 'absolute'}}>
                  <MaterialIcons name="list" size={32} color="#000"/>
              </Animated.View>

              <Animated.View style={{ transform: [{ rotate: rotation2 }], opacity: iconOpacity2, position: 'absolute'}}>
                  <MaterialIcons name="close" size={32} color="#000"/>
              </Animated.View>

          </TouchableOpacity>
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
  ingredientTitle:{
    position: 'absolute',
    top: height / 3.5,
    marginLeft: 10,
    color: "#fff",
    fontWeight: '500',
    fontSize: 28
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
    backgroundColor: 'rgba(58,90,140,.96)',
  },
  icon:{

  },
  rowWrap:{
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5
  },
  ingredientText:{
    fontSize: 16,
    maxWidth: '80%',
    paddingLeft: 10,
    fontWeight: '600',
    color:"#fff",
  },
  iconWrap:{
    backgroundColor: "#ff6e6e",
    height: 35,
    width: 35,
    justifyContent: 'center',
    borderRadius: 100,
    alignItems: 'center',
    marginRight: 10,
  },
  container:{
    marginVertical: 5,
    borderBottomWidth: .5,
    borderColor: "rgba(255,255,255,.6)",
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  doneWrap:{
    position: 'absolute',
    height: 55,
    bottom: 90,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneButton:{
    width: '50%',
    backgroundColor: COLORS.buttonColor,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 30,
    shadowRadius: 5,
    shadowOffset: {height:5},
    shadowOpacity: 0.3,
  },
  doneText:{
    fontSize: 18,
    fontWeight: 'bold'
  }
})
