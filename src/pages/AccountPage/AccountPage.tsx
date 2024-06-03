import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './AccountPage.css';
import Account from '../../components/Account/Account';
import { ArrowIcon } from '../../components/Icons/ArrowIcon';
import { LSTokens } from '../../types';
import { getUserInfo } from '../../redux/actionCreators/userActionCreator';
import { ROUTES } from '../../utils/routes';

const AccountPage = () => {
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
      <Account />
    </div>
  );
};

export default AccountPage;
