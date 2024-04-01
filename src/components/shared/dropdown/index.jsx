import "./style.scss"

const Dropdown = ({ id, label, options }) => (
  <span className="Dropdown">
    <label htmlFor={id}>{label}</label>
    <select id={id}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </span>
)

export default Dropdown
