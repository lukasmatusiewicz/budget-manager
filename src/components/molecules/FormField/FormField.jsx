import './FormField.css';

const FormField = ({ label, type = 'text', name, value, onChange, placeholder, required = false, step }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        step={step}
      />
    </div>
  );
};

export default FormField;
