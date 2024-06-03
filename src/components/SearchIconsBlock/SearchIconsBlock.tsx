import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IStoreState } from '../../types';

import './SearchIconsBlock.css';
import { HeartIcon } from '../Icons/HeartIcon';
import { CartIcon } from '../Icons/CartIcon';
import { ProfileIcon } from '../Icons/ProfileIcon';
import { ROUTES } from '../../utils/routes';
import { LSTokens } from '../../types';

const SearchIconsBlock = () => {
  const cart = useSelector((state: IStoreState) => state.user.cart);
  const favorites = useSelector((state: IStoreState) => state.user.favorites);

  const quantityBooks = cart.reduce((acc, cur) => acc + cur.quantity, 0);
  const favoritesLength = favorites.length;

  const accessToken = localStorage.getItem(LSTokens.ACCESS_TOKEN);

  const isAccessSuccess = (route: string) =>
    accessToken ? navigate(route) : navigate(ROUTES.AUTHORISATION);

  const goToFavorites = () => isAccessSuccess(ROUTES.FAVORITES);

  const goToCart = () => {
    isAccessSuccess(ROUTES.CART);
  };

  const goToAccount = () => isAccessSuccess(ROUTES.ACCOUNT);

  const navigate = useNavigate();
  return (
    <div className="icons-container">
      <div style={{ position: 'relative' }}>
        <HeartIcon onClick={goToFavorites} isFilled={!!favoritesLength} />
        {favoritesLength > 0 && (
          <span className="icon-book-quantity">{favoritesLength}</span>
        )}
      </div>

      <CartIcon onClick={goToCart} isFilled={!!cart.length} quantity={quantityBooks} />
      <ProfileIcon onClick={goToAccount} />
    </div>
  );
};

export default SearchIconsBlock;
