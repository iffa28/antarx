import './FormField.css';

function FormField({ id, label, type = 'text', ...inputProps }) {
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} {...inputProps} />
    </div>
  );
}

export default FormField;
