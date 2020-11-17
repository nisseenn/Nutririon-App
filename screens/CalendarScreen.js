import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import CalendarStrip from 'react-native-calendar-strip';

const {width,height} = Dimensions.get('window')

const CalendarScreen = () => {

  //Returning the JSX code
  return(
    <View style={styles.wrapper}>
      <CalendarStrip
        onDateSelected={(date) => console.log(date)}
        // scrollable={true}
        style={{flex:1, height:200, paddingTop: 100, paddingBottom: 10}}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper:{
    flex:1,
  }
})

//Exporting the component so that we can use it in other components
export default CalendarScreen
