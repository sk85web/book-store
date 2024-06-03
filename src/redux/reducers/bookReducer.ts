import {
  SET_BOOKS,
  SET_TOTAL,
  SET_SELECTED_BOOK,
  SET_SEARCH_BOOKS,
  SET_SEARCH_TOTAL,
  SET_CURRENT_PAGE,
} from '../actionTypes';
import { IBook } from '../../types';

const initialStoreState = {
  books: [],
  total: '',
  selectedBook: {} as IBook,
  searchBooks: [],
  searchTotal: '',
  currentPage: 1,
  query: '',
};
export const bookReducer = (state = initialStoreState, action: any) => {
  switch (action.type) {
    case SET_BOOKS:
      return { ...state, books: action.books };
    case SET_TOTAL:
      return { ...state, total: action.total };
    case SET_SELECTED_BOOK:
      return { ...state, selectedBook: action.selectedBook };
    case SET_SEARCH_BOOKS:
      return { ...state, searchBooks: action.books };
    case SET_SEARCH_TOTAL:
      return { ...state, searchTotal: action.total };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.currentPage };
  }
  return state;
};
