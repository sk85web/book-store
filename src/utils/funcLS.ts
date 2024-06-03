import { LS } from '../constants/constants';
import { IBookCart, IBook } from '../types';

export const getCartFromLS = (): IBookCart[] => {
  const cart = localStorage.getItem(LS.CART);
  return cart ? JSON.parse(cart) : [];
};

export const setCartToLS = (cart: IBookCart[]) => {
  localStorage.setItem(LS.CART, JSON.stringify(cart));
};

export const getFavoritesFromLS = (): IBook[] => {
  const favorites = localStorage.getItem(LS.FAVORITES);
  return favorites ? JSON.parse(favorites) : [];
};

export const setFavoritesToLS = (favorites: IBook[]) => {
  localStorage.setItem(LS.FAVORITES, JSON.stringify(favorites));
};
