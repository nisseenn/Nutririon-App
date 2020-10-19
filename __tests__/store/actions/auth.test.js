import { AUTHENTICATE, authenticate, EMAIL_VERIFY, verifyEmail, LOGOUT, logout } from '../../../store/actions/auth';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import auth from '../../../store/reducers/auth';


const initialState = {
  token: null,
  userId: null,
  verified: false,
  preference: null,
  freetime: null,
  work: null
}

let middlewares = [ thunk ];
let mockStore = configureStore(middlewares);


describe('AUTH ACTION', () => {

  
  it('dispatches the AUTHENTICATE action', () => {
    let store = mockStore(initialState);

    store.dispatch(authenticate('123', '321'));
    expect(store.getActions()).toEqual([{ type: AUTHENTICATE, userId: '123', token: '321',  }]);
  });



  it('dispatches the EMAIL_VERIFY action', () => {
      let store = mockStore(initialState);

      store.dispatch(verifyEmail(true));
      expect(store.getActions()).toEqual([{ type: EMAIL_VERIFY, verified: true}]);
  });


    it('dispatches the LOGOUT action', () => {
      let store = mockStore(initialState);

      store.dispatch(logout());
      expect(store.getActions()).toEqual([{ type: LOGOUT}]);
  });


});