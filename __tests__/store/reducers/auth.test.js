import configureStore from 'redux-mock-store';
import auth from '../../../store/reducers/auth';

const state = {
        token: 123,
        userId: 321,
        verified: true,
        preference: 'pref',
        freetime: 'free',
        work: 'work'};

describe('AUTH REDUCER', () => {

  it('DEFAULT should return current state ', () => {
    const action = { type: 'no_action' };
    
    expect(auth(undefined, action)).toBeDefined();
    expect(auth(state, action)).toEqual(state);
    });


    it('AUTHENTICATE should return token and userId from action', () => {
    const action = {type: 'AUTHENTICATE', token: 111, userId:222};
    
    expect(auth(state, action).token).toEqual(111);
    expect(auth(state, action).userId).toEqual(222);
    });


    it('LOGOUT should return initial state ', () => {
    const action = { type: 'LOGOUT' };

    expect(auth(state, action)).not.toEqual(state);
    });


    it('EMAIL_VERIFY is empty and should trigger DEFAULT', () => {
    const action = { type: 'EMAIL_VERIFY' };

    expect(auth(state, action)).not.toEqual(state);
    });


    it('SET_PREFERENCE should return token, userID, preference, freetime, work from action ', () => {
    const action = {type: 'SET_PREFERENCE',
        token: 111,
        userId: 222,
        preference: 'new_pref',
        freetime: 'new_freetime',
        work: 'new_work'};

    const received = auth(state, action);

    expect(received.token).toEqual(state.token);
    expect(received.userId).toEqual(state.userId);
    expect(received.preference).toEqual('new_pref');
    expect(received.freetime).toEqual('new_freetime');
    expect(received.work).toEqual('new_work');
    });

});