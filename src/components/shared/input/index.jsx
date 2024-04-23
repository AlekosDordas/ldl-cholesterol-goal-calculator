import { forwardRef } from "react"
import "./input.scss"

const Input = forwardRef(
  ({ type = "text", min, step, id, label, placeholder }, ref) => {
    const otherParameters = {}

    if (type === "number") {
      if (min) otherParameters.min = min
      if (step) otherParameters.step = step
    }

    return (
      <span className="Input">
        <label htmlFor={id}>{label}</label>
        <input
          type={type}
          id={id}
          ref={ref}
          placeholder={placeholder}
          {...otherParameters}
        />
      </span>
    )
  }
)

export default Input
