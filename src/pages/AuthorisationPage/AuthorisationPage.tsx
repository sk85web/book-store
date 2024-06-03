import SignIn from '../../components/SignIn/SignIn';
import SignUp from '../../components/SignUp/SignUp';
import './AuthorisationPage.css';
import { useState } from 'react';

const AuthorisationPage = () => {
  const [isActiveSignIn, setIsActiveSignIn] = useState(true);
  const [isActiveSignUp, setIsActiveSignUp] = useState(false);

  const handleSignInClick = () => {
    setIsActiveSignIn(true);
    setIsActiveSignUp(false);
  };

  const handleSignUpClick = () => {
    setIsActiveSignIn(false);
    setIsActiveSignUp(true);
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <span
          onClick={handleSignInClick}
          className={`auth-header-title ${isActiveSignIn ? 'active-title' : ''}`}
        >
          sign in
        </span>
        <span
          onClick={handleSignUpClick}
          className={`auth-header-title ${isActiveSignUp ? 'active-title' : ''}`}
        >
          sign up
        </span>
      </div>
      {isActiveSignIn ? <SignIn /> : <SignUp />}
    </div>
  );
};

export default AuthorisationPage;
