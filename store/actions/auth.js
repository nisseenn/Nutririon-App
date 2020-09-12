import { AsyncStorage } from 'react-native'
import firebase from 'firebase';

let config = {
  apiKey: "AIzaSyC7I68QZY4Hw-6B7BmV1NunNi4FPo572w8",
  authDomain: "nutrition-1cf49.firebaseapp.com",
  databaseURL: "https://nutrition-1cf49.firebaseio.com",
  projectId: "nutrition-1cf49",
  storageBucket: "nutrition-1cf49.appspot.com",
  messagingSenderId: "986189188129",
  appId: "1:986189188129:web:07deb8d6abd6a77cfa6760",
  measurementId: "G-K73D2K115H"
};
let app = firebase.initializeApp(config);

export const LOGOUT = "LOGOUT"
export const AUTHENTICATE = "AUTHENTICATE"
// export const EMAIL_VERIFY = "EMAIL_VERIFY"

export const authenticate = (userId, token) => {
  return dispatch => {
    // dispatch(setLogoutTimer(expiryTime))
    dispatch({ type: AUTHENTICATE, userId: userId, token: token })
  }
}

export const verifyEmail = (verified) => {
  return dispatch => {
    dispatch({ type: EMAIL_VERIFY, verified: verified })
  }
}

export const signup = (email, password, name, gender, age, weight, userHeight, preference) => {
  return async dispatch => {
    const response = await firebase.auth().createUserWithEmailAndPassword(email, password)
    const user = await firebase.auth().currentUser;

    const idToken = await user.getIdToken()

    const updateUser = await user.updateProfile({
      displayName: name,
    })

    let updates = {}

    let userData = {
      gender: gender,
      age: age,
      weight: weight,
      userHeight: userHeight,
      preference: preference
    }

    updates['users/'+user.uid] = userData;
    await firebase.database().ref().update(updates)

    // user.sendEmailVerification().then(function() {
    //   // dispatch(verifyEmail(false))
    // }).catch(function(error) {
    //
    // });

    dispatch(authenticate(user.uid, idToken))
    saveDataToStorage(idToken, user.uid)
  }
}

export const login = (email, password) => {
  return async dispatch => {
    const response = await firebase.auth().signInWithEmailAndPassword(email, password)

    const user = await firebase.auth().currentUser;
    const idToken = await user.getIdToken()

    dispatch(authenticate(user.uid, idToken))
    saveDataToStorage(idToken, user.uid)
  }
}

export const logout = () => {
  //clearing the token and user data from local storage on phone
  AsyncStorage.removeItem('userData')
  return { type: LOGOUT }
}

const saveDataToStorage = (token, userId) => {
  AsyncStorage.setItem('userData', JSON.stringify({
    token: token,
    userId: userId,
  }))
}
