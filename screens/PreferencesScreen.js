import React, { useState, useReducer, useCallback, useEffect, useRef } from 'react'
import { ScrollView, View, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Text, Button, ActivityIndicator, Alert, Image, Dimensions } from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { RadioButton, Checkbox } from 'react-native-paper';

import Colors from '../constants/Colors'

const {width,height} = Dimensions.get('window')

const PreferencesScreen = (props) => {
  //Getting params from the navigation passed in prev component in stack
  const gender = props.navigation.getParam("gender")
  const age = props.navigation.getParam("age")
  const weight = props.navigation.getParam("weight")
  const userHeight = props.navigation.getParam("height")
  //Creating state for preferences
  const [isVegeterianer, setVegeterianer] = useState(false)
  const [isVeganer, setIsVeganer] = useState(false)
  const [isPesc, setIsPesc] = useState(false)
  //State for the single select box
  const [checked, setChecked] = useState(null);

  return(
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}>

      <View style={styles.arrowWrap}>
        <MaterialIcons onPress={() => {props.navigation.navigate("info")}} name="navigate-before" color="#000" size={35}/>
      </View>

      <View style={{paddingBottom: 40, maxWidth: width / 1.3}}>
        <Text style={{fontSize: 26, fontWeight: 'bold', textAlign: 'center'}}>
          Any preferences we should know about?
        </Text>
      </View>

      <View style={styles.boxWrap}>
        <View style={styles.textWrap}>
          <Text style={styles.boxText}>
            Vegeterian
          </Text>
        </View>

        <View style={{borderWidth: 1, borderRadius: 100, borderColor: "#000", position: 'absolute', right: 0}}>
          <RadioButton
            value="vegeterianer"
            status={ checked === 'vegeterianer' ? 'checked' : 'unchecked' }
            color={Colors.primaryColor}
            onPress={() => setChecked('vegeterianer')}
          />
        </View>
      </View>

      <View style={styles.boxWrap}>
        <View style={styles.textWrap}>
          <Text style={styles.boxText}>
            Vegan
          </Text>
        </View>

        <View style={{borderWidth: 1, borderRadius: 100, borderColor: "#000", position: 'absolute', right: 0}}>
          <RadioButton
            value="vegan"
            status={ checked === 'vegan' ? 'checked' : 'unchecked' }
            color={Colors.primaryColor}
            onPress={() => setChecked('vegan')}
          />
        </View>
      </View>

      <View style={styles.boxWrap}>
        <View style={styles.textWrap}>
          <Text style={styles.boxText}>
            Pescetarian
          </Text>
        </View>

        <View style={{borderWidth: 1, borderRadius: 100, borderColor: "#000", position: 'absolute', right: 0}}>
          <RadioButton
            value="pesc"
            status={ checked === 'pesc' ? 'checked' : 'unchecked' }
            color={Colors.primaryColor}
            onPress={() => {
              setChecked('pesc')
            }}
          />
        </View>
      </View>

      <View style={styles.bottomButtonWrap}>
        <TouchableOpacity
          onPress={() => {
            //Passing props via navigation
            props.navigation.navigate("method", {
              gender: gender,
              age: age,
              height: userHeight,
              weight: weight,
              preference: checked
            })
          }}
          style={styles.buttonBottom}>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>
            NEXT
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

PreferencesScreen.navigationOptions = () => {
  return {
    headerShown: false
  }
}

const styles = StyleSheet.create({
  arrowWrap:{
    position: 'absolute',
    top: 50,
    left: 10
    // flex:1,
  },
  boxWrap:{
    width: '80%',
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textWrap:{
    marginRight: 60
  },
  boxText:{
    fontSize: 30,
    fontWeight: '500',
  },
  bottomButtonWrap:{
    position: 'absolute',
    bottom: 100,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonBottom:{
    backgroundColor: Colors.buttonColor,
    paddingHorizontal: width / 3,
    paddingVertical: 15,
    borderRadius: 100
  }
})

export default PreferencesScreen
