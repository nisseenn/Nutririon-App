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
export const SET_PREFERENCE = "SET_PREFERENCE"
// export const EMAIL_VERIFY = "EMAIL_VERIFY"

//Creating a function to fetch user data when app loads
export const fetchUserData = () => {
    return async (dispatch, getState) => {
      //Getting userid and token
      const userId = getState().auth.userId
      const token = getState().auth.token
      try {
        //Requesting data from Firebase with token and userid
        const response = await fetch(`https://nutrition-1cf49.firebaseio.com/users/${userId}.json?auth=${token}`);
      if (!response.ok) {
        console.log('not ok');
        throw new Error('Something went wrong');
      }
      //transforming data from response
      const resData = await response.json();
      //Dispatching the preference to the Redux Store
      dispatch({ type: SET_PREFERENCE, preference: resData.preference })

    } catch (err) {
      throw err;
    }
  }
}

export const editPreference = (preference, token, userId) => {
  return async (dispatch, getState) => {
    const user = await firebase.auth().currentUser;
    const userId = user.uid
    const token = await user.getIdToken()
    try {
      //Requesting data from Firebase with token and userid
      const response = await fetch(`https://nutrition-1cf49.firebaseio.com/users/${userId}.json?auth=${token}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          preference: preference
        })
      });

    if(!response.ok) {
      throw new Error("Something went wrong")
    }
    //transforming data from response
    const resData = await response.json();
    console.log(resData);

  } catch (err) {
    throw err;
  }
    dispatch({ type: SET_PREFERENCE, preference: preference })
  }
}

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
    dispatch({ type: SET_PREFERENCE, preference: preference })
    saveDataToStorage(idToken, user.uid, name)
  }
}

export const login = (email, password) => {
  return async dispatch => {
    const response = await firebase.auth().signInWithEmailAndPassword(email, password)

    const user = await firebase.auth().currentUser;
    const idToken = await user.getIdToken()

    dispatch(authenticate(user.uid, idToken))
    saveDataToStorage(idToken, user.uid, user.displayName)
  }
}

export const logout = () => {
  //clearing the token and user data from local storage on phone
  AsyncStorage.removeItem('userData')
  return { type: LOGOUT }
}

const saveDataToStorage = (token, userId, displayName) => {
  AsyncStorage.setItem('userData', JSON.stringify({
    token: token,
    userId: userId,
    displayName: displayName
  }))
}
