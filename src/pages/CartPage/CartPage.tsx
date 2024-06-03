import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Cart from '../../components/Books/Cart/Cart';
import { ArrowIcon } from '../../components/Icons/ArrowIcon';
import { LSTokens } from '../../types';
import { getUserInfo } from '../../redux/actionCreators/userActionCreator';
import { ROUTES } from '../../utils/routes';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem(LSTokens.ACCESS_TOKEN)) {
      dispatch(getUserInfo());
    } else navigate(ROUTES.AUTHORISATION);
  }, [dispatch]);

  return (
    <div>
      <ArrowIcon />
      <Cart />
    </div>
  );
};

export default CartPage;
