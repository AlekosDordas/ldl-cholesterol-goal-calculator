import { forwardRef, useCallback, useEffect, useState } from "react"
import "./dropdown.scss"

const Dropdown = forwardRef(({ id, label, options }, ref) => {
  const [value, setValue] = useState()

  useEffect(() => {
    setValue(ref.current.value)
  }, [ref])

  const changeHandler = useCallback(() => {
    setValue(ref.current.value)
  }, [ref])

  const clickOptionHandler = useCallback(
    value => {
      ref.current.value = value
      ref.current.dispatchEvent(new Event("change", { bubbles: true }))
    },
    [ref]
  )

  return (
    <span className="Dropdown">
      <div className="Dropdown__toggler">
        {options.map((option, index) => (
          <div
            key={index}
            className={`Dropdown__option
              ${value === option.id ? "Dropdown__option--selected" : ""}
            `}
            onClick={() => clickOptionHandler(option.id)}
          >
            {option.label}
          </div>
        ))}
      </div>
      <label htmlFor={id}>{label}</label>
      <select id={id} ref={ref} onChange={changeHandler}>
        {options.map((option, index) => (
          <option key={index} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </span>
  )
})

export default Dropdown
