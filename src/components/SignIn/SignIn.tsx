import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import './SignIn.css';
import Button from '../Button/Button';
import { ButtonType } from '../../types';
import FormInput from '../FormInput/FormInput';
import { getErrorMessage } from '../../utils/getErrorMessages';
import { signInUser } from '../../redux/actionCreators/userActionCreator';

const SignIn = () => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const handleInputChange = (key: keyof typeof formState, value: string) => {
    setFormState(prev => ({
      ...prev,
      [key]: value,
    }));

    let error = '';
    error = getErrorMessage[key](value);

    setErrors(prev => ({
      ...prev,
      [key]: error,
    }));
  };

  useEffect(() => {
    const isValid = Object.values(formState).every(val => val.length);
    setIsFormValid(isValid);
  }, [formState]);

  const dispatch = useDispatch();
  const handleSignIn = () => {
    dispatch(signInUser(formState));
  };
  return (
    <form
      className="sign-in-form"
      onKeyDown={e => {
        if (e.key === 'Enter' && isFormValid) {
          dispatch(signInUser(formState));
        }
      }}
    >
      <FormInput
        title="Email"
        name="email"
        type="email"
        placeholder="Your email"
        value={formState.email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleInputChange('email', e.target.value)
        }
        error={errors.email}
      />

      <FormInput
        title="Password"
        name="password"
        type="password"
        placeholder="Password"
        value={formState.password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleInputChange('password', e.target.value)
        }
        error={errors.password}
      />
      <span className="forgot-pass">Forgot password ?</span>

      <div className="form-button-block">
        <Button
          type={ButtonType.BUTTON}
          text="Sign in"
          className="form-button"
          isDisabled={!isFormValid}
          onClick={handleSignIn}
        />
      </div>
    </form>
  );
};

export default SignIn;
