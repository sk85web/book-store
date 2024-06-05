import { takeEvery, put } from 'redux-saga/effects';

import {
  SIGN_UP_USER,
  SIGN_IN_USER,
  GET_USER,
  SET_USER,
  ACTIVATE_SIGN_UP,
  ADD_BOOK_TO_CART,
  REMOVE_BOOK_FROM_CART,
  DECREASE_QUANTITY,
  INCREASE_QUANTITY,
  REMOVE_BOOK_FROM_FAVORITES,
  ADD_BOOK_TO_FAVORITES,
  RESET_EMAIL,
  CONFIRM_EMAIL,
} from '../actionTypes';
import {
  ISignUpData,
  ISignInData,
  IUser,
  IToken,
  IActivationInfo,
  IBook,
  LSTokens,
  IUserEmail,
} from '../../types';
import { ROUTES } from '../../utils/routes';

const signUpUser = (signUpData: ISignUpData) => ({
  type: SIGN_UP_USER,
  signUpData,
});

const signInUser = (signInData: ISignInData) => ({
  type: SIGN_IN_USER,
  signInData,
});

const activateSignUp = (activateInfo: IActivationInfo) => ({
  type: ACTIVATE_SIGN_UP,
  activateInfo,
});

const getUserInfo = () => ({
  type: GET_USER,
});

const setUser = (user: IUser) => ({
  type: SET_USER,
  user,
});

const addBookToCart = (book: IBook) => ({
  type: ADD_BOOK_TO_CART,
  book,
});

const decreaseQuantity = (book: IBook) => ({
  type: DECREASE_QUANTITY,
  book,
});

const increaseQuantity = (book: IBook) => ({
  type: INCREASE_QUANTITY,
  book,
});

const removeBookFromCart = (book: IBook) => ({
  type: REMOVE_BOOK_FROM_CART,
  book,
});

const addBookToFavorites = (book: IBook) => ({
  type: ADD_BOOK_TO_FAVORITES,
  book,
});

const removeBookFromFavorites = (book: IBook) => ({
  type: REMOVE_BOOK_FROM_FAVORITES,
  book,
});

const resetUserEmail = (email: IUserEmail) => ({
  type: RESET_EMAIL,
  email,
});

const confirmUserEmail = (new_email: IUserEmail) => ({
  type: CONFIRM_EMAIL,
  new_email,
});

function* resetEmail(action: any) {
  const resp: Response = yield fetch(
    `https://studapi.teachmeskills.by/auth/users/reset_email/`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(action.email),
    },
  );
  if (resp.status === 204) {
    const data: string = yield resp.json();
    // yield put(confirmUserEmail(data.new_email));
  }
}

function* confirmEmail(action: any) {
  try {
    const resp: Response = yield fetch(
      `https://studapi.teachmeskills.by/auth/users/reset_email_confirm/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ new_email: action.new_email }),
      },
    );

    if (resp.status === 200) {
      console.log('Email confirmed successfully.');
    } else {
      console.error('Failed to confirm email:', resp.statusText);
    }
  } catch (error) {
    console.error('Error in confirmEmail saga:', error);
  }
}

function* signUp(action: any) {
  const resp: Response = yield fetch(`https://studapi.teachmeskills.by/auth/users/`, {
    method: 'POST',
    body: JSON.stringify(action.signUpData),
    headers: {
      'content-type': 'application/json',
    },
  });
  if (resp.status === 201) {
    alert('Great! To finish your registration confirm your email address');
  } else if (resp.status === 400) {
    alert('User with these data is already exist');
  } else alert('Bad response');
}

function* activationUser(action: any) {
  const resp: Response = yield fetch(
    `https://studapi.teachmeskills.by/auth/users/activation/`,
    {
      method: 'POST',
      body: JSON.stringify(action.activateInfo),
      headers: {
        'content-type': 'application/json',
      },
    },
  );
  if (resp.status === 204) {
    alert('Success');
  }
}

function* signIn(action: any) {
  const resp: Response = yield fetch(
    `https://studapi.teachmeskills.by/auth/jwt/create/`,
    {
      method: 'POST',
      body: JSON.stringify(action.signInData),
      headers: {
        'content-type': 'application/json',
      },
    },
  );
  if (resp.status === 200) {
    const respJSON: IToken = yield resp.json();
    localStorage.setItem(LSTokens.ACCESS_TOKEN, respJSON.access);
    localStorage.setItem(LSTokens.REFRESH_TOKEN, respJSON.refresh);
    window.location.pathname = ROUTES.MAIN;
  } else {
    alert('Your credentials are wrong. Please try again');
  }
}

function* getToken() {
  const token = localStorage.getItem(LSTokens.ACCESS_TOKEN);
  const resp: Response = yield fetch(
    `https://studapi.teachmeskills.by/auth/jwt/verify/`,

    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ token: token }),
    },
  );
  if (resp.status === 200) {
    return token;
  } else {
    const refresh = localStorage.getItem(LSTokens.REFRESH_TOKEN);
    const resp: Response = yield fetch(
      `https://studapi.teachmeskills.by/auth/jwt/refresh/`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ refresh: refresh }),
      },
    );
    if (resp.status === 200) {
      const token: { access: string } = yield resp.json();
      localStorage.setItem(LSTokens.ACCESS_TOKEN, token.access);
      return token.access;
    }
    return 'Bad authorisation';
  }
}

function* getUser() {
  const token: string = yield getToken();
  const resp: Response = yield fetch(`https://studapi.teachmeskills.by/auth/users/me/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (resp.status === 200) {
    const user: IUser = yield resp.json();
    yield put(setUser(user));
  }
}

export function* watcherUser() {
  yield takeEvery(SIGN_UP_USER, signUp);
  yield takeEvery(SIGN_IN_USER, signIn);
  yield takeEvery(ACTIVATE_SIGN_UP, activationUser);
  yield takeEvery(GET_USER, getUser);
  yield takeEvery(RESET_EMAIL, resetEmail);
  yield takeEvery(CONFIRM_EMAIL, confirmEmail);
}

export {
  signUpUser,
  signInUser,
  activateSignUp,
  getUserInfo,
  getToken,
  addBookToCart,
  increaseQuantity,
  decreaseQuantity,
  removeBookFromCart,
  addBookToFavorites,
  removeBookFromFavorites,
  resetUserEmail,
  confirmUserEmail,
};
