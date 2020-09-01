import { AUTHENTICATE } from '../actions/auth'
import { LOGOUT } from '../actions/auth'
import { EMAIL_VERIFY } from '../actions/auth'

const initialState = {
  token: null,
  userId: null,
  verified: false
}

export default (state= initialState, action) => {
  switch(action.type){
    case AUTHENTICATE:
      return { token: action.token, userId: action.userId }

    case LOGOUT:
      return initialState;

    case EMAIL_VERIFY:
      // console.log(action.verified);

    default:
      return state;
  }
}
