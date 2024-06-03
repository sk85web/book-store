import { takeEvery, put } from 'redux-saga/effects';

import {
  LOAD_BOOKS,
  SET_BOOKS,
  SET_TOTAL,
  SET_SELECTED_BOOK,
  LOAD_SELECTED_BOOK,
  LOAD_SEARCH_BOOKS,
  SET_SEARCH_TOTAL,
  SET_SEARCH_BOOKS,
  SET_CURRENT_PAGE,
} from '../actionTypes';
import { IBook, IBooksApiResponse } from '../../types';
import { getToken } from './userActionCreator';

const setTotal = (total: string) => ({
  type: SET_TOTAL,
  total,
});

const setBooks = (books: IBook[]) => ({
  type: SET_BOOKS,
  books,
});

const setSearchTotal = (total: string) => ({
  type: SET_SEARCH_TOTAL,
  total,
});

const setSearchBooks = (books: IBook[]) => ({
  type: SET_SEARCH_BOOKS,
  books,
});

const loadBooks = (apiInfo: IBooksApiResponse) => ({
  type: LOAD_BOOKS,
  apiInfo,
});

const loadSearchBooks = (apiInfo: IBooksApiResponse) => ({
  type: LOAD_SEARCH_BOOKS,
  apiInfo,
});

const setSelectedBook = (selectedBook: IBook) => ({
  type: SET_SELECTED_BOOK,
  selectedBook,
});

const setCurrentPage = (currentPage: string) => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});

const loadSelectedBook = (isbn13: string) => ({
  type: LOAD_SELECTED_BOOK,
  isbn13,
});

function* fetchLoadBooks(action: any) {
  const { search } = action.apiInfo;
  let url = 'https://api.itbook.store/1.0';
  if (search) {
    url += `/search/${search}`;
  } else url += `/new`;

  try {
    const resp: Response = yield fetch(`${url}`);
    const fetchData: IBooksApiResponse = yield resp.json();
    yield put(setBooks(fetchData.books));
    yield put(setTotal(fetchData.total));
  } catch (error) {
    console.error('Error fetch: ', error);
  }
}

function* fetchSearchBooks(action: any) {
  const { search, page } = action.apiInfo;
  let url = `https://api.itbook.store/1.0/search/${search}`;
  if (page) {
    url += `/${page}`;
  }
  try {
    const resp: Response = yield fetch(`${url}`);
    const fetchSearchData: IBooksApiResponse = yield resp.json();
    console.log(fetchSearchData);
    yield put(setSearchBooks(fetchSearchData.books));
    yield put(setSearchTotal(fetchSearchData.total));
  } catch (error) {
    console.error('Error fetch: ', error);
  }
}

function* fetchLoadSelectedBook(action: any) {
  getToken();
  const resp: Response = yield fetch(
    `https://api.itbook.store/1.0/books/${action.isbn13}`,
  );
  const bookInfo: IBook = yield resp.json();
  yield put(setSelectedBook(bookInfo));
}

function* watcherBooks() {
  yield takeEvery(LOAD_BOOKS, fetchLoadBooks);
  yield takeEvery(LOAD_SELECTED_BOOK, fetchLoadSelectedBook);
  yield takeEvery(LOAD_SEARCH_BOOKS, fetchSearchBooks);
}

export {
  setBooks,
  loadBooks,
  watcherBooks,
  setTotal,
  loadSelectedBook,
  loadSearchBooks,
  setCurrentPage,
};
