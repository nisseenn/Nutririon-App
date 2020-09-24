import React, { useState, useReducer, useCallback, useEffect, useRef } from 'react'
import { ScrollView, View, TextInput, StyleSheet, FlatList, KeyboardAvoidingView, TouchableOpacity, Text, Button, ActivityIndicator, Alert, Image, Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Colors from '../constants/Colors'

const {width,height} = Dimensions.get('window')

const IngredientItem = (props) => {
  return(
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log(props.name);
        }}
        >
        <Text style={styles.ingredientText}>
          {props.name}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    marginVertical: 5,
  },
  button:{
    width: '100%',
    height: 70,
    // backgroundColor: "#e8f4fd",
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  ingredientText:{
    fontSize: 20,
    // backgroundColor: 'red',
    paddingLeft: 30,
    fontWeight: '600'
  }
})

export default IngredientItem
