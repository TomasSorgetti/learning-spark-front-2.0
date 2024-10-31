export default function FormField({ label, type, handleChange, value, name }) {
  return (
    <div>
      <label>{label}</label>
      <input type={type} onChange={handleChange} value={value} name={name} />
    </div>
  );
}
