import { forwardRef } from "react"
import "./style.scss"

const Dropdown = forwardRef(({ id, label, options }, ref) => (
  <span className="Dropdown">
    <label htmlFor={id}>{label}</label>
    <select id={id} ref={ref}>
      {options.map((option, index) => (
        <option key={index} value={option.id}>
          {option.label}
        </option>
      ))}
    </select>
  </span>
))

export default Dropdown
