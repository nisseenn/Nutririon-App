// A custom button for the bottomnavigator, to make it more sexy
import React, { useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, Animated } from 'react-native'
import { Ionicons, MaterialIcons, FontAwesome5, Feather } from '@expo/vector-icons';
import Colors from '../constants/Colors'

export default class AddButton extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        shadowColor: this.props.color
      };
  }
  render(){
    return(
      <TouchableHighlight style={[styles.button, {shadowColor: this.state.shadowColor, backgroundColor: Colors.buttonColor}]} onPress={() => console.log('hei')}>
        <Animated.View>
          <FontAwesome5 name="plus" size={15} color={this.state.shadowColor} onPress={() => console.log('hei2')} />
        </Animated.View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  button:{
    // backgroundColor: Colors.buttonColor,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 36,
    position: 'absolute',
    // shadowColor: "#893D3D",
    shadowRadius: 5,
    shadowOffset: {height:5},
    shadowOpacity: 0.3
  },
})
