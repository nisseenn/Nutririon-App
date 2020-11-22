import React, { useEffect, useState, useCallback } from 'react'
import { ScrollView, View, Animated, FlatList, LayoutAnimation, StyleSheet, TouchableOpacity, Text, ActivityIndicator, Image, Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

const {width,height} = Dimensions.get('window')

const breakfast = require('../assets/breakfast.png')
const lunch = require('../assets/lunchbox.png')
const dinner = require('../assets/fast-food.png')
const snacks = require('../assets/snacks.png')

const MealsListItem = (props) => {

  const [open, setOpen] = useState(false)

  const heightOfShit = open ? height / 4 : height / 8

  return(
    <View style={[styles.cardWrap, {height: heightOfShit}]}>
      {open ? (
          <TouchableOpacity
            activeOpacity={.7}
            onPress={() => {
              LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
              setOpen(!open)
            }}
            style={styles.card}>
            {props.mealType == "Breakfast" ? (
              <Image source={breakfast} style={styles.image}/>
            ) : (
              <View></View>
            )}

            {props.mealType == "Dinner" ? (
              <Image source={dinner} style={styles.image}/>
            ) : (
              <View></View>
            )}

            {props.mealType == "Lunch" ? (
              <Image source={breakfast} style={styles.image}/>
            ) : (
              <View></View>
            )}

            {props.mealType == "Snacks" ? (
              <Image source={snacks} style={styles.image}/>
            ) : (
              <View></View>
            )}

            <View style={{flex:1}}>
              <View style={styles.mealtypeWrap}>
                <View>
                  <Text style={styles.cardTitle}>{props.mealType}</Text>
                </View>
                <View style={styles.dateWrap}>
                  <Text style={styles.cardDesc2}>{props.date.day}.{props.date.month}.{props.date.year}</Text>
                </View>

              </View>
              <View style={{marginTop: 0, marginLeft: 30, marginBottom: 20}}>
                <Text style={styles.cardDesc}>kcals: {props.data[0].split(".")[0]}</Text>
                <Text style={styles.cardDesc}>fat: {props.data[1].split(".")[0]}g</Text>
                <Text style={styles.cardDesc}>carbs: {props.data[2].split(".")[0]}g</Text>
                <Text style={styles.cardDesc}>protein: {props.data[3].split(".")[0]}g</Text>
              </View>
            </View>



          </TouchableOpacity>
      ) : (
          <TouchableOpacity
            activeOpacity={.7}
            onPress={() => {
              LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
              setOpen(!open)
            }}
            style={styles.card}>
            {props.mealType == "Breakfast" ? (
              <Image source={breakfast} style={styles.image}/>
            ) : (
              <View></View>
            )}

            {props.mealType == "Dinner" ? (
              <Image source={dinner} style={styles.image}/>
            ) : (
              <View></View>
            )}

            {props.mealType == "Lunch" ? (
              <Image source={breakfast} style={styles.image}/>
            ) : (
              <View></View>
            )}

            {props.mealType == "Snacks" ? (
              <Image source={snacks} style={styles.image}/>
            ) : (
              <View></View>
            )}

            <View style={styles.mealtypeWrap}>
              <View>
                <Text style={styles.cardTitle}>{props.mealType}</Text>
              </View>
              <View style={styles.dateWrap}>
                <Text style={styles.cardDesc2}>{props.date.day}.{props.date.month}.{props.date.year}</Text>
              </View>
            </View>

          </TouchableOpacity>
      )}
  </View>
  )
}

const styles = StyleSheet.create({
  cardWrap:{
    alignItems: 'center'
  },
  card:{
    backgroundColor: 'rgba(176,189,209,1)',
    width: '95%',
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
    flexDirection: 'row',
    shadowRadius: 2,
    shadowOffset: {height:2},
    shadowOpacity: 0.1,
    zIndex: 1000,
    flex:1,
    height: "auto",
    overflow: 'hidden'
  },
  image:{
    marginLeft: 20,
    width: 60,
    height: 60
  },
  cardTitle:{
    fontSize: 20,
    marginLeft: 30,
    color:"#000",
    fontWeight: 'bold',
  },
  cardDesc:{
    fontSize: 16,
    color:"#000",
    fontWeight: '600',
    marginTop: 5,
  },
  cardDesc2:{
    fontSize: 16,
    color:"#000",
    fontWeight: '400',
    marginTop: 5
  },
  dateWrap:{
    position: 'absolute',
    right: 10
  },
  mealtypeWrap:{
    flex:1,
    alignItems: 'center',
    flexDirection: 'row'
  }
})


export default MealsListItem
