import React, { useState, useReducer, useCallback, useEffect, useRef } from 'react'
import { ScrollView, View, TextInput, StyleSheet, FlatList, KeyboardAvoidingView, TouchableOpacity, Text, Button, ActivityIndicator, Alert, Image, Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Colors from '../constants/Colors'
import { fetchIngredients } from '../store/actions/nutrition'
import { SearchBar } from 'react-native-elements';

const {width,height} = Dimensions.get('window')

const NewMeal = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState()
  const [search, setSearch] = useState(null)

  const dispatch = useDispatch()

  const ingredients = useSelector(state => state.nutrition.ingredients)


  const loadIngredients = useCallback(async () => {
  setIsRefreshing(true)
  setError(null)
  try {
    await dispatch(fetchIngredients())
  } catch (err) {
    setError(err.message)
  }
  setIsRefreshing(false)
}, [dispatch, setIsLoading, setError])

  const renderIngredients = (itemData) => {
    return(
      <View>
        <Text>
          {itemData.item.name}
        </Text>
      </View>
    )
  };

  // const renderHeader = () => {
  //   return(
  //     <View
  //        style={{
  //          backgroundColor: '#fff',
  //          padding: 10,
  //          marginVertical: 10,
  //          borderRadius: 20
  //        }}
  //      >
  //        {/* <TextInput
  //           // style = {styles.input}
  //           onChangeText={text => setSearch(text)}
  //           selectionColor = "#9a73ef"
  //           maxLength={60}
  //           returnKeyType="done"
  //           placeholder="example@ex.com"
  //           textAlign="left"
  //           keyboardType="email-address"
  //         /> */}
  //      </View>
  //   )
  // }

  useEffect(() => {
  setIsLoading(true)
  loadIngredients().then(() => {
    setIsLoading(false)
  })
}, [dispatch])

  if(isLoading){
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.iconColor} />
      </View>
    );
  }

  return(
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}>
      <View style={{width: width, position: 'absolute', top: 50, zIndex: 4000}}>
        <SearchBar
          lightTheme={true}
          platform="ios"
          containerStyle={{backgroundColor: '#fff'}}
          inputContainerStyle={{backgroundColor: "#e5e5e5"}}
          placeholder="Search here..."
          onChangeText={text => setSearch(text)}
          value={search}
        />
      </View>
      <FlatList
        contentContainerStyle={{ paddingTop: 130, width: width}}
        scrollEventThrottle={16}
        // ListHeaderComponent={renderHeader}
      //   onScroll={Animated.event([
      //     {
      //     nativeEvent: { contentOffset: { y: scrollY }}
      //     }
      // ],{ useNativeDriver: true })}
        onRefresh={loadIngredients}
        refreshing={isRefreshing}
        numColumns={2}
        data={ingredients}
        renderItem={renderIngredients}
        keyExtractor={(item, index) => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
   width: '100%',
   height: 40,
   fontSize: 18,
   textAlign: 'left',
   borderColor: '#d9d9d9',
   borderBottomWidth: 1,
   color:"black"
  },
})

export default NewMeal
