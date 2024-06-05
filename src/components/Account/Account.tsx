import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import FormInput from '../FormInput/FormInput';
import './Account.css';
import { ButtonType, IStoreState } from '../../types';
import Button from '../Button/Button';
import {
  resetUserEmail,
  confirmUserEmail,
} from '../../redux/actionCreators/userActionCreator';
import { ROUTES } from '../../utils/routes';

const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector((state: IStoreState) => state.user.user);
  const [formState, setFormState] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: '',
    new_password: '',
    confirmation: '',
  });

  // console.log(currentUser);

  useEffect(() => {
    setFormState({
      username: currentUser.username,
      email: currentUser.email,
      password: '',
      new_password: '',
      confirmation: '',
    });
  }, [currentUser]);

  const handleInputChange = (key: keyof typeof formState, value: string) => {
    setFormState(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const changeUserData = () => {
    const { email } = formState;
    if (email !== currentUser.email) {
      dispatch(resetUserEmail({ email }));
    } else alert('Equel email');
  };

  const logOut = () => {
    localStorage.clear();
    navigate(ROUTES.AUTHORISATION);
  };
  const toMainPage = () => {
    navigate(ROUTES.MAIN);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h1 className="title">Account</h1>
      <div className="profile-block">
        <h2 className="block-title">profile</h2>
        <div className="input-container">
          <FormInput
            className="form-input-style"
            title="Name"
            name="username"
            type="name"
            placeholder="Your name"
            value={formState.username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange('username', e.target.value)
            }
          />

          <FormInput
            title="Email"
            name="email"
            type="email"
            placeholder="Your email"
            value={formState.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange('email', e.target.value)
            }
          />
        </div>
      </div>
      <h2 className="block-title">password</h2>
      <div className="password-block">
        <FormInput
          className="form-input-style"
          title="Password"
          name="password"
          type="password"
          placeholder="Password"
          value={formState.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange('password', e.target.value)
          }
        />
        <div className="password-block-group">
          <FormInput
            className="form-input-style"
            title="New password"
            name="new_password"
            type="password"
            placeholder="New password"
            value={formState.new_password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange('new_password', e.target.value)
            }
          />
          <FormInput
            className="form-input-style"
            title="Confirm new password"
            name="confirmation"
            type="password"
            placeholder="Confirm new password"
            value={formState.confirmation}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange('confirmation', e.target.value)
            }
          />
        </div>
      </div>
      <div className="account-buttons-block">
        <Button type={ButtonType.BUTTON} text="Save changes" onClick={changeUserData} />
        <Button type={ButtonType.BUTTON} text="Cancel" onClick={toMainPage} />
        <Button type={ButtonType.BUTTON} text="Log out" onClick={logOut} />
      </div>
    </div>
  );
};
export default Account;
