//This screen is supposed to check if user have token stored on HD
//If so, the user will be redirected to the Mainnavigator, and not the Authstack
import React, { useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import { authenticate } from '../store/actions/auth';

const StartupScreen = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        props.navigation.navigate('Auth');
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId } = transformedData;

      props.navigation.navigate('Main');
      dispatch(authenticate(userId, token));
    };

    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primaryColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default StartupScreen;
