import React, { useReducer, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

//Defining some constants to use in reducer
const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

//Defining a reducer function
//We use this to have more complex state tweaking than just normal useState
const inputReducer = (state, action) => {
  switch (action.type) {
    //If input changes the state will be set to previous state, but value will change to the action value
    //IsValid will also change to the action isValid value
    case INPUT_CHANGE:
      //Return a javascript object (which redux by default require)
      return {
        ...state,
        value: action.value,
        isValid: action.isValid
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true
      };
    default:
      return state;
  }
};

//Defining the component in a functional manner, recieves props, as this coponent will be
//used in multiple other components such as Login and Signup
const Input = props => {
  //Defining inputState (which holds a value) and dispatch with is going to be called whenever we want
  //to change state of inputState
  //useReducer takes a reducer fuction as first argument, and then a value,
  //The value here will be the props that are passed from the parent function
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : '',
    isValid: props.initiallyValid,
    touched: false
  });

  //Object destructuring to get the values from props.
  //same as writing props.onInputChange etc
  const { onInputChange, id } = props;

  //useEffect runns before component is redered
  //We check if inputState. touched is true
  //if so, we pass the values to the function in props
  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  //usestate will be firing whenever these chnage
  }, [inputState, onInputChange, id]);

  //creating a funciton which takes some text as parameter
  const textChangeHandler = text => {
    //Do some regular checking of the Text
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    //is passing the tests, we dispatch an action INPUT_CHANGE, with values and isvalid state
    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
  };

  //Define a function which is called onBlur in the textinput field
  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        //Pass the parent props to this component
        {...props}
        style={styles.input}
        value={inputState.value}
        onChangeText={textChangeHandler}
        onBlur={lostFocusHandler}
      />
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    width: '100%'
  },
  label: {
    marginVertical: 8
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  errorContainer: {
    marginVertical: 5
  },
  errorText: {
    color: 'red',
    fontSize: 13
  }
});

export default Input;
