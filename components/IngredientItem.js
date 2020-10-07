import React, { useState, useReducer, useCallback, useEffect, useRef } from 'react'
import { ScrollView, View, TextInput, StyleSheet, FlatList, KeyboardAvoidingView, TouchableOpacity, Text, Button, ActivityIndicator, Alert, Image, Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Colors from '../constants/Colors'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const {width,height} = Dimensions.get('window')

const IngredientItem = (props) => {
  const ingredientsAdded = useSelector(state => state.nutrition.mealIngredients)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    const addedIngredient = ingredientsAdded.find(ingredient => ingredient.id == props.id)
    if(addedIngredient !== undefined){
      setAdded(true)
    }
    else {
      setAdded(false)
    }
  },[ingredientsAdded])
  return(
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={props.onSelectIngredient}
        >
          <View style={styles.rowWrap}>
            <Text style={styles.ingredientText}>
              {props.name}
            </Text>
            {added ? (
              <TouchableOpacity
                onPress={() => {}}
                style={styles.iconWrap2}>
                <Ionicons style={{}} color="white" size={40} name="ios-checkmark"/>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={props.onAddIngredient}
                style={styles.iconWrap}>
                <Ionicons style={{}} size={30} name="ios-add"/>
              </TouchableOpacity>
            )}
          </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    marginVertical: 5,
    borderBottomWidth: .5,
    borderColor: "#ccc",
    width: '100%'
  },
  button:{
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  rowWrap:{
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center'
  },
  iconWrap:{
    position: 'absolute',
    right: 10,
    backgroundColor: "rgba(204,204,204,.4)",
    height: 45,
    width: 45,
    justifyContent: 'center',
    borderRadius: 100,
    alignItems: 'center'
  },
  iconWrap2:{
    position: 'absolute',
    right: 10,
    backgroundColor: "#6adb57",
    height: 45,
    width: 45,
    justifyContent: 'center',
    borderRadius: 100,
    alignItems: 'center'
  },
  ingredientText:{
    fontSize: 16,
    maxWidth: '80%',
    paddingLeft: 10,
    fontWeight: '600'
  }
})

export default IngredientItem
