import React, { useState, useReducer, useCallback, useEffect, useRef } from 'react'
import { ScrollView, View, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Text, Button, ActivityIndicator, Alert, Image, Dimensions } from 'react-native'
import { AsyncStorage } from 'react-native'

const ProfileScreen = () => {
  // const user = AsyncStorage.getItem('userData')
  // if(!userData){
  //   return;
  // }
  // const transformedData = JSON.parse(userData)
  // const { token, userId } = transformedData
  //
  // console.log(userId);

  return(
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>
        ProfileScreen
      </Text>
    </View>
  )
}

export default ProfileScreen
