import './SignConfirmation.css';
import Button from '../Button/Button';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { activateSignUp } from '../../redux/actionCreators/userActionCreator';
import { ButtonType } from '../../types';
import { ROUTES } from '../../utils/routes';

export const SignConfirmation = () => {
  const { uid = '', token = '' } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log({ uid, token });
    dispatch(activateSignUp({ uid, token }));
  }, []);

  const handleConfirm = () => {
    window.location.pathname = ROUTES.AUTHORISATION;
  };

  return (
    <div className="sign-confirmation-container">
      <div className="container">
        <div className="sign-confirmation-btn">
          <p>Your enter is successfull!</p>
          <Button
            type={ButtonType.BUTTON}
            text="Confirm"
            className="form-button"
            onClick={handleConfirm}
          />
        </div>
      </div>
    </div>
  );
};
