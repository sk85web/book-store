import { IButton, ButtonType } from '../../types';
import './Button.css';

const Button: React.FC<IButton> = ({
  type,
  isDisabled = false,
  text,
  onClick,
  className = '',
}) => {
  return (
    <button
      className={`button ${className}`}
      disabled={isDisabled}
      type={type === ButtonType.SUBMIT ? 'submit' : 'button'}
      onClick={() => onClick && onClick()}
    >
      {text}
    </button>
  );
};

export default Button;
