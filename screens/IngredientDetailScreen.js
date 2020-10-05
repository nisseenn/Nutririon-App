import React, { useState, useReducer, useCallback, useEffect, useRef } from 'react'
import { ScrollView, SafeAreaView, View, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity, Text, Button, ActivityIndicator, Alert, Image, Dimensions } from 'react-native'
import { fetchUserData } from '../store/actions/auth'
import { fetchIngredients } from '../store/actions/nutrition'
import { useDispatch, useSelector } from 'react-redux'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'
import Colors from '../constants/Colors'

const {width,height} = Dimensions.get('window')
//Defining IngredientDetailScreen functional component
const IngredientDetailScreen = (props) => {
  console.log(props);
  const name = props.navigation.getParam("name")
  const porsjon = props.navigation.getParam("porsjon")
  const protein = props.navigation.getParam("protein")
  const fett = props.navigation.getParam("fett")
  const fiber = props.navigation.getParam("fiber")
  const karbo = props.navigation.getParam("karbo")
  const sukker = props.navigation.getParam("sukker")
  //Returning the JSX code
  return(
    <ScrollView contentContainerStyle={{flex: 1, paddingBottom: 100}}>
      <View style={styles.header}>
        <LinearGradient
            colors={["rgba(144,249,244,0.4)", "rgba(71,167,245, 0.2)"]}
            style={{
              // flex:1,
              height: height / 4
            }}
          />
        <View style={styles.arrowWrap}>
          <MaterialIcons onPress={() => {props.navigation.navigate("mealStart")}} name="navigate-before" color="black" size={35}/>
        </View>
        <Text style={styles.headerText}>{name}</Text>
      </View>

      <View style={styles.contentWrap}>
        <View style={styles.numberWrap}>
          <TextInput />
        </View>
        <View style={styles.buttonWrap}>
          <TouchableOpacity
            style={styles.addButton}>
            <Text style={styles.buttonText}>ADD</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.nutrientWrap}>
          <Text style={styles.nutrientTitle}>
            Nutrients
          </Text>
          <Text style={styles.nutrientSub}>
            1 portion (100g)
          </Text>
        </View>

        <View style={styles.ingValues}>
          <View style={styles.value}>
            <Text style={styles.valueText}>Protein {protein}</Text>
          </View>
          <View style={styles.value}>
            <Text style={styles.valueText}>Fat {fett}</Text>
          </View>
          <View style={styles.value}>
            <Text style={styles.valueText}>Carbo {karbo}</Text>
          </View>
          <View style={styles.value}>
            <Text style={styles.valueText}>Fiber {fiber}</Text>
          </View>
        </View>

      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  header:{
    position: 'absolute',
    width: '100%',
    top: 0,
    height: height / 4,
  },
  headerText:{
    fontSize: 24,
    fontWeight: 'bold',
    position: 'absolute',
    bottom:10,
    left: 10,
  },
  arrowWrap:{
    position: 'absolute',
    top: 50,
    left: 10
    // flex:1,
  },
  contentWrap:{
    position: 'absolute',
    top: height / 2.5,
    width: '100%'
  },
  buttonWrap:{
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton:{
    paddingVertical: 15,
    width: '96%',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.buttonColor
  },
  buttonText:{
    fontSize: 18,
    fontWeight: 'bold'
  },
  nutrientWrap:{
    marginTop: 50,
  },
  nutrientTitle:{
    fontSize: 24,
    fontWeight: '500',
    marginLeft: 10
  },
  nutrientSub:{
    fontSize: 15,
    fontWeight: '300',
    marginLeft: 10,
    marginTop: 5
  },
  ingValues:{
    marginTop: 50,
  },
  value:{
    justifyContent: 'center',
    height: 60,
    borderBottomWidth: .2,
    borderTopWidth: .2
  },
  valueText:{
    fontSize: 18,
    marginLeft: 10,
    fontWeight: '600',
  }
})

IngredientDetailScreen.navigationOptions = () => {
  return {
    headerShown: false
  }
}

//Exporting the component so that we can use it in other components
export default IngredientDetailScreen
