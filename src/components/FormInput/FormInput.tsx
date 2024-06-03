import { IFormInput } from '../../types';
import './FormInput.css';

const FormInput: React.FC<IFormInput> = ({
  name,
  type = 'text',
  placeholder,
  value,
  required = true,
  onChange,
  className = '',
  title,
  error,
}) => {
  return (
    <label className="form-label">
      {title}
      <input
        className={`form-input ${error ? 'form-input_error' : ''} ${className}`}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <p className="error-text">{error}</p>}
    </label>
  );
};

export default FormInput;
