import React, { useState, useReducer, useCallback, useEffect, useRef } from 'react'
import { ScrollView, View, StyleSheet, FlatList, KeyboardAvoidingView, TouchableOpacity, Text, Button, ActivityIndicator, Alert, Image, Dimensions } from 'react-native'
import { fetchUserData } from '../store/actions/auth'
import { fetchIngredients } from '../store/actions/nutrition'
import { useDispatch, useSelector } from 'react-redux'
import CalendarStrip from 'react-native-calendar-strip';
import Colors from '../constants/Colors'
import * as Animatable from 'react-native-animatable';
import Carousel, { Pagination } from 'react-native-snap-carousel';

const proteinPic = require('../assets/protein.png')
const carbPic = require('../assets/wheat.png')
const caloryPic = require('../assets/burn.png')
const fatPic = require('../assets/pizza.png')

const {width,height} = Dimensions.get('window')

const CarouselComponent = (props) => {



  const [activeSlide, setActiveSlide] = useState()
  const [activeTitle, setActiveTitle] = useState("Calories")
  const carouselRef = useRef()

  const data = [
    {text: props.cals, type: 'cals', pic: caloryPic},
    {text: props.carbs, type: 'carbs', pic: carbPic},
    {text: props.protein, type: 'protein', pic: proteinPic},
    {text: props.fat, type: 'fat', pic: fatPic},
  ]

  const renderCarousel = (itemData) => {
    return(
      <View style={styles.wrap}>
          <Image source={itemData.item.pic} style={styles.image}/>
          <Text style={{fontSize: 30}}>{itemData.item.text}g</Text>
      </View>
    )
  }

  const handleChange = (index) => {

    if(index == 0){
      setActiveTitle("Calories")
    }
    if(index == 1){
      setActiveTitle("Carbs")
    }
    if(index == 2){
      setActiveTitle("Protein")
    }
    if(index == 3){
      setActiveTitle("Fat")
    }
  }

  return(
    <View style={styles.container}>
      <View
        style={styles.titleWrap}>
        <Text style={styles.title}>{activeTitle}</Text>
      </View>
      <Carousel
        ref={carouselRef}
        data={data}
        layout={'default'}
        renderItem={renderCarousel}
        sliderWidth={width}
        itemWidth={width / 1.75}
        inactiveSlideScale={.97}
        swipeThreshold={1}
        onBeforeSnapToItem={(index) => handleChange(index)}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    alignItems: 'center'
  },
  titleWrap:{
    width: '90%',
    alignItems: 'center',
    marginVertical: 15,
  },
  title:{
    fontSize: 22,
    fontWeight: 'bold',
  },
  wrap:{
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#fff",
    height: height / 8,
    borderRadius: 5,
    shadowRadius: 2,
    shadowOffset: {height:2},
    shadowOpacity: 0.4,
  },
  image:{
    marginRight: 20,
    width: 60,
    height: 60
  },
})

export default CarouselComponent
