import { forwardRef } from "react"
import "./checkbox.scss"

const Checkbox = forwardRef(({ label, id }, ref) => (
  <span className="Checkbox">
    <label htmlFor={id}>{label}</label>
    <input type="checkbox" id={id} ref={ref} />
  </span>
))

export default Checkbox
