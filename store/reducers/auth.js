import { AUTHENTICATE } from '../actions/auth'
import { LOGOUT } from '../actions/auth'
import { EMAIL_VERIFY } from '../actions/auth'
import { SET_PREFERENCE } from '../actions/auth'

const initialState = {
  token: null,
  userId: null,
  verified: false,
  preference: null
}

export default (state= initialState, action) => {
  switch(action.type){
    case AUTHENTICATE:
      return { token: action.token, userId: action.userId }

    case LOGOUT:
      return initialState;

    case EMAIL_VERIFY:
      // console.log(action.verified);
    //To set the preferences when app loads
    case SET_PREFERENCE:
      return { preference: action.preference }

    default:
      return state;
  }
}
