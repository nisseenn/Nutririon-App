//third party imports
import React, { useState, useReducer, useCallback, useEffect, useRef } from 'react'
import { ScrollView, View, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Text, Button, ActivityIndicator, Alert, Image, Dimensions } from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { RadioButton, Checkbox } from 'react-native-paper';
import { Switch } from 'react-native-switch';

// constants imports
import COLORS from '../constants/Colors'
import STRINGS from '../constants/Strings'

const {width,height} = Dimensions.get('window')

const PreferencesScreen = (props) => {
  //Getting params from the navigation passed in prev component in stack
  const gender = props.navigation.getParam("gender")
  const userWork = props.navigation.getParam("work")
  const userFreetime = props.navigation.getParam("freetime")
  const age = props.navigation.getParam("age")
  const weight = props.navigation.getParam("weight")
  const userHeight = props.navigation.getParam("height")
  //Creating state for preferences
  const [isVegeterianer, setVegeterianer] = useState(false)
  const [isVeganer, setIsVeganer] = useState(false)
  const [isPesc, setIsPesc] = useState(false)
  //State for the single select box
  const [preference, setPreference] = useState(null);

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
              {STRINGS.preference[1] /*vegeterian*/}
            </Text>
          </View>

      <View style={{position: 'absolute', right: 0}}>
            <Switch
                value={preference === STRINGS.preference[1] ? true : false}
                onValueChange={() => setPreference(STRINGS.preference[1])}
                //barHeight={10}
                renderActiveText={false}
                renderInActiveText={false}
                circleBorderWidth={0}
                backgroundActive={COLORS.accentColor}
                backgroundInactive={'gray'}
                circleActiveColor={COLORS.primaryColor}
                circleInActiveColor={'lightgrey'}
                changeValueImmediately={true}
                switchWidthMultiplier={2}
            />
          </View>
          
        </View>

        <View style={styles.boxWrap}>
          <View style={styles.textWrap}>
            <Text style={styles.boxText}>
              {STRINGS.preference[2] /*Vegan*/}
            </Text>
          </View>

          <View style={{position: 'absolute', right: 0}}>
            <Switch
                value={preference === STRINGS.preference[2] ? true : false}
                onValueChange={() => setPreference(STRINGS.preference[2])}
                //barHeight={10}
                renderActiveText={false}
                renderInActiveText={false}
                circleBorderWidth={0}
                backgroundActive={COLORS.accentColor}
                backgroundInactive={'gray'}
                circleActiveColor={COLORS.primaryColor}
                circleInActiveColor={'lightgrey'}
                changeValueImmediately={true}
                switchWidthMultiplier={2}
            />
          </View>
          
        </View>

        <View style={styles.boxWrap}>
          <View style={styles.textWrap}>
            <Text style={styles.boxText}>
              {STRINGS.preference[3]}
            </Text>
          </View>

          <View style={{position: 'absolute', right: 0}}>
            <Switch
                value={preference === STRINGS.preference[3] ? true : false}
                onValueChange={() => setPreference(STRINGS.preference[3])}
                //barHeight={10}
                renderActiveText={false}
                renderInActiveText={false}
                circleBorderWidth={0}
                backgroundActive={COLORS.accentColor}
                backgroundInactive={'gray'}
                circleActiveColor={COLORS.primaryColor}
                circleInActiveColor={'lightgrey'}
                changeValueImmediately={true}
                switchWidthMultiplier={2}
            />
          </View>
        </View>

          <View style={styles.boxWrap}>
          <View style={styles.textWrap}>
            <Text style={styles.boxText}>
              {STRINGS.preference[0]}
            </Text>
          </View>

          <View style={{position: 'absolute', right: 0}}>
            <Switch
                value={preference === STRINGS.preference[0] ? true : false}
                onValueChange={() => setPreference(STRINGS.preference[0])}
                //barHeight={10}
                renderActiveText={false}
                renderInActiveText={false}
                circleBorderWidth={0}
                backgroundActive={COLORS.accentColor}
                backgroundInactive={'gray'}
                circleActiveColor={COLORS.primaryColor}
                circleInActiveColor={'lightgrey'}
                changeValueImmediately={true}
                switchWidthMultiplier={2}
            />
          </View>
        </View>

      <View style={styles.bottomButtonWrap}>
        <TouchableOpacity
          onPress={() => {
            //Passing props via navigation
            props.navigation.navigate("method", {
              gender: gender,
              work: userWork,
              freetime: userFreetime,
              age: age,
              height: userHeight,
              weight: weight,
              preference: preference
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
    backgroundColor: COLORS.buttonColor,
    paddingHorizontal: width / 3,
    paddingVertical: 15,
    borderRadius: 100
  }
})

export default PreferencesScreen
