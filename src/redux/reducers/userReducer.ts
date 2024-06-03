import { IBookCart, IUser, IBook, ISignUpData } from '../../types';
import {
  ADD_BOOK_TO_CART,
  ADD_BOOK_TO_FAVORITES,
  DECREASE_QUANTITY,
  SET_USER,
  INCREASE_QUANTITY,
  REMOVE_BOOK_FROM_CART,
  REMOVE_BOOK_FROM_FAVORITES,
} from '../actionTypes';
import {
  getCartFromLS,
  setCartToLS,
  getFavoritesFromLS,
  setFavoritesToLS,
} from '../../utils/funcLS';

const initialStoreState = {
  cart: getCartFromLS() || ([] as IBookCart[]),
  user: {} as IUser,
  favorites: getFavoritesFromLS() || ([] as IBook[]),
  userData: {} as ISignUpData,
};
export const userReducer = (state = initialStoreState, action: any) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.user };

    case ADD_BOOK_TO_CART: {
      const oldBooks = [...state.cart];
      const found = oldBooks.find(book => book.book.isbn13 === action.book.isbn13);
      if (found) {
        const updatedBooks = oldBooks.map(book =>
          book.book.isbn13 === action.book.isbn13
            ? { ...book, quantity: book.quantity + 1 }
            : book,
        );
        setCartToLS(updatedBooks);
        return { ...state, cart: updatedBooks };
      } else {
        const newBook: IBookCart = { book: action.book, quantity: 1 };
        const newCart = [...state.cart, newBook];
        setCartToLS(newCart);
        return { ...state, cart: newCart };
      }
    }

    case DECREASE_QUANTITY: {
      const oldBooks = [...state.cart];
      const upDatedBooks = oldBooks.map(book =>
        action.book.isbn13 === book.book.isbn13 && book.quantity > 1
          ? { ...book, quantity: book.quantity - 1 }
          : book,
      );
      setCartToLS(upDatedBooks);
      return { ...state, cart: upDatedBooks };
    }

    case INCREASE_QUANTITY: {
      const oldBooks = [...state.cart];
      const upDatedBooks = oldBooks.map(book =>
        action.book.isbn13 === book.book.isbn13
          ? { ...book, quantity: book.quantity + 1 }
          : book,
      );
      setCartToLS(upDatedBooks);
      return { ...state, cart: upDatedBooks };
    }

    case REMOVE_BOOK_FROM_CART: {
      const oldBooks = [...state.cart];
      const newBooks = oldBooks.filter(book => action.book.isbn13 !== book.book.isbn13);
      setCartToLS(newBooks);
      return { ...state, cart: newBooks };
    }

    case ADD_BOOK_TO_FAVORITES: {
      setFavoritesToLS([...state.favorites, action.book]);
      return { ...state, favorites: [...state.favorites, action.book] };
    }

    case REMOVE_BOOK_FROM_FAVORITES: {
      const oldBooks = [...state.favorites];
      const newBooks = oldBooks.filter(book => action.book.isbn13 !== book.isbn13);
      setFavoritesToLS(newBooks);
      return { ...state, favorites: newBooks };
    }

    default:
      return state;
  }
};
