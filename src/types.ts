export interface IBook {
  error: string;
  title: string;
  subtitle: string;
  authors: string;
  publisher: string;
  isbn10: string;
  isbn13: string;
  language: string;
  pages: string;
  year: string;
  rating: string;
  desc: string;
  price: string;
  image: string;
  url: string;
  pdf: {
    [key: string]: string;
  };
}

export interface IBooksStore {
  books: IBook[];
  total: string;
  selectedBook: IBook;
  searchBooks: IBook[];
  searchTotal: string;
  currentPage: string;
  query: string;
}

export interface IBookCart {
  book: IBook;
  quantity: number;
}

export interface IUser {
  username: string;
  id: number;
  email: string;
}

export interface IUserStore {
  cart: IBookCart[];
  user: IUser;
  favorites: IBook[];
  userData: ISignUpData;
}

export interface IStoreState {
  books: IBooksStore;
  user: IUserStore;
}

export interface IBooksApiResponse {
  total: string;
  books: IBook[];
  search?: string | null;
  page?: string | null;
}

export enum ButtonType {
  SUBMIT = 'submit',
  BUTTON = 'button',
}

export interface IButton {
  isDisabled?: boolean;
  type: ButtonType;
  className?: string;
  onClick?: () => void;
  text: string;
}

export interface IFormInput {
  name?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  required?: boolean;
  title: string;
  className?: string;
  error?: string;
  new_password?: string;
  confirm_password?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ISignUpData {
  username: string;
  email: string;
  password: string;
  course_group?: number;
}

export interface ISignInData {
  email: string;
  password: string;
}

export interface IToken {
  access: string;
  refresh: string;
}

export enum LSTokens {
  ACCESS_TOKEN = 'accessToken',
  REFRESH_TOKEN = 'refreshToken',
}

export interface IActivationInfo {
  uid: string;
  token: string;
}

export interface IUserEmail {
  email?: string;
  new_email?: string;
}
