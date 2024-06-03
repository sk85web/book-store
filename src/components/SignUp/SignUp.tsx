import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getErrorMessage } from '../../utils/getErrorMessages';

import './SignUp.css';
import Button from '../Button/Button';
import { ButtonType } from '../../types';
import FormInput from '../FormInput/FormInput';
import { signUpUser } from '../../redux/actionCreators/userActionCreator';

const SignUp = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    confirmation: '',
  });
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmation: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const handleInputChange = (key: keyof typeof formState, value: string) => {
    setFormState(prev => ({
      ...prev,
      [key]: value,
    }));

    let error = '';

    if (key === 'confirmation') {
      error = getErrorMessage[key](formState.password, value);
    } else {
      error = getErrorMessage[key](value);
    }
    setErrors(prev => ({
      ...prev,
      [key]: error,
    }));
  };

  useEffect(() => {
    const isValid =
      Object.values(formState).every(val => val.length) &&
      Object.values(errors).every(val => val.length === 0);
    setIsFormValid(isValid);
  }, [formState, errors]);

  const dispatch = useDispatch();

  // habuc@mailto.plus
  // 123456!@#$%^q

  const handleSignUp = () => {
    const { confirmation, ...other } = formState;
    isFormValid && dispatch(signUpUser(other));
  };

  return (
    <form className="sign-up-form">
      <FormInput
        title="Name"
        name="name"
        type="name"
        placeholder="Your name"
        value={formState.username}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleInputChange('username', e.target.value)
        }
        error={errors.username}
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

      <FormInput
        title="Confirm password"
        name="confirmation"
        type="password"
        placeholder="Confirm password"
        value={formState.confirmation}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleInputChange('confirmation', e.target.value)
        }
        error={errors.confirmation}
      />

      <div className="form-button-block">
        <Button
          type={ButtonType.BUTTON}
          text="Sign up"
          className="form-button"
          isDisabled={!isFormValid}
          onClick={handleSignUp}
        />
      </div>
    </form>
  );
};

export default SignUp;
