import userReducer from './userReducer';
import { SET_TOKEN, SET_USER } from './actionTypes';
import { UserActionTypes } from './usersTypes';
import { User } from '../../types';

describe('features > user > userReducer', () => {
  const initialState = {
    value: {} as User,
    token: '',
  }

  test(`updates user in state when ${SET_USER} action is provided`, () => {
    const user: User = {
      id: 1,
      email: 'test@example.com',
      password: null,
      userRoles: [],
    };

    const action: UserActionTypes = {
      type: SET_USER,
      payload: user,
    };

    const expectedState = {
      ...initialState,
      value: user,
    };

    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  test(`updates token in state when ${SET_TOKEN} action is provided`, () => {
    const token = 'abcd1234';

    const action: UserActionTypes = {
      type: SET_TOKEN,
      payload: token,
    };

    const expectedState = {
      ...initialState,
      token: token,
    };

    expect(userReducer(initialState, action)).toEqual(expectedState);
  });
});
