import React, { useState, useReducer, useCallback, useEffect, useRef } from 'react'
import { ScrollView, SafeAreaView, View, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity, Text, Button, ActivityIndicator, Alert, Image, Dimensions } from 'react-native'

import { fetchUserData } from '../store/actions/auth'
import { fetchIngredients } from '../store/actions/nutrition'
import { addIngredient } from '../store/actions/nutrition'

import { useDispatch, useSelector } from 'react-redux'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'
import Colors from '../constants/Colors'
import ProgressCircle from 'react-native-progress-circle'

const {width,height} = Dimensions.get('window')
//Defining IngredientDetailScreen functional component
const IngredientDetailScreen = (props) => {

  const dispatch = useDispatch()

  const [number, setNumber] = useState("1")

  const id = props.navigation.getParam("id")
  const name = props.navigation.getParam("name")
  const porsjon = props.navigation.getParam("porsjon").replace(/[&\/\\#,+()$~%'":*?<>{}=@;]/g, '').split("value")[1]
  const protein = props.navigation.getParam("protein").replace(/[&\/\\#,+()$~%'":*?<>{}=@;]/g, '').split("value")[1]
  const fett = props.navigation.getParam("fett").replace(/[&\/\\#,+()$~%'":*?<>{}=@;]/g, '').split("value")[1]
  const fiber = props.navigation.getParam("fiber").replace(/[&\/\\#,+()$~%'":*?<>{}=@;]/g, '').split("value")[1]
  const karbo = props.navigation.getParam("karbo").replace(/[&\/\\#,+()$~%'":*?<>{}=@;]/g, '').split("value")[1]
  const sukker = props.navigation.getParam("sukker").replace(/[&\/\\#,+()$~%'":*?<>{}=@;]/g, '').split("value")[1]

  //Returning the JSX code
  return(
    <ScrollView
      contentContainerStyle={{height: height * 1.25}}>
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
          <TextInput
            value={number}
            onChangeText={value => setNumber(value)}
            style={styles.input}
            keyboardType="number-pad"
            returnKeyType="done"
        />
        <TouchableOpacity
          style={styles.definition}
          onPress={() => {

          }}
        >
          <Text style={styles.nameIngredient}>{name.split(",")[0]}</Text>
          <MaterialIcons name="navigate-next" color="rgba(0,0,0,.6)" size={24}/>
        </TouchableOpacity>
        </View>
        <View style={styles.buttonWrap}>
          <TouchableOpacity
            onPress={() => {
              let objectReturn = addIngredient(id)
              dispatch(objectReturn)
              props.navigation.navigate("mealStart")
            }}
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

        <View style={styles.barWrap}>
          <View style={styles.eachBar}>
            <ProgressCircle
                percent={protein}
                radius={50}
                borderWidth={10}
                color={Colors.primaryColor}
                shadowColor="#ccc"
                bgColor="#fff"
            >
                <Text style={{ fontSize: 24, fontWeight: '600'}}>{protein.split(".")[0] / 100 * 100}%</Text>
            </ProgressCircle>
            <Text style={{fontSize: 16, fontWeight: '600', marginTop: 10}}>Protein</Text>
          </View>

          <View style={styles.eachBar}>
            <ProgressCircle
                percent={fett}
                radius={50}
                borderWidth={10}
                color={Colors.primaryColor}
                shadowColor="#ccc"
                bgColor="#fff"
            >
                <Text style={{ fontSize: 24, fontWeight: '600'}}>{fett.split(".")[0] / 100 * 100}%</Text>
            </ProgressCircle>
            <Text style={{fontSize: 16, fontWeight: '600', marginTop: 10}}>Fat</Text>
          </View>

          <View style={styles.eachBar}>
            <ProgressCircle
                percent={karbo}
                radius={50}
                borderWidth={10}
                color={Colors.primaryColor}
                shadowColor="#ccc"
                bgColor="#fff"
            >
                <Text style={{ fontSize: 24, fontWeight: '600'}}>{karbo.split(".")[0] / 100 * 100}%</Text>
            </ProgressCircle>
            <Text style={{fontSize: 16, fontWeight: '600', marginTop: 10}}>Carbo</Text>
          </View>
        </View>

        <View style={styles.ingValues}>
          <View style={styles.value}>
            <Text style={styles.valueText}>Protein</Text>
            <Text style={styles.valueText2}>{protein} g</Text>
          </View>
          <View style={styles.value}>
            <Text style={styles.valueText}>Fat</Text>
            <Text style={styles.valueText2}>{fett} g</Text>
          </View>
          <View style={styles.value}>
            <Text style={styles.valueText}>Carbo </Text>
            <Text style={styles.valueText2}>{karbo} g</Text>
          </View>
          <View style={styles.value}>
            <Text style={styles.valueText}>Fiber</Text>
            <Text style={styles.valueText2}>{fiber} g</Text>
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
    maxWidth: '80%',
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
    top: height / 3.3,
    width: '100%'
  },
  numberWrap:{
    alignItems: 'center',
    marginLeft: 10,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  input:{
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1.3,
    width: '20%',
    borderRadius: 10,
    textAlign: 'center'
  },
  definition:{
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1.3,
    width: '65%',
    marginRight: 10,
    borderRadius: 10,
    textAlign: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: 10
  },
  nameIngredient:{
    fontSize: 18,
    fontWeight: '300',
    marginLeft: 10,
    color: "rgba(0,0,0,0.6)"
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
  barWrap:{
    justifyContent: 'space-between',
    marginTop: 30,
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  eachBar:{
    alignItems: 'center'
  },
  ingValues:{
    marginTop: 50,
  },
  value:{
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    borderBottomWidth: .3,
    borderTopWidth: .3,
    borderColor: "#ccc",
    flexDirection: 'row'
  },
  valueText:{
    fontSize: 18,
    marginLeft: 10,
    fontWeight: '600',
  },
  valueText2:{
    fontSize: 18,
    marginRight: 30,
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
