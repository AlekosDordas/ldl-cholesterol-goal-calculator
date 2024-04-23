import { forwardRef, useCallback, useState } from "react"
import checkmark from "../../../assets/images/check.svg"
import "./checkbox.scss"

const Checkbox = forwardRef(({ label, id }, ref) => {
  const [isChecked, setIsChecked] = useState(ref?.current?.checked || false)

  const changeHandler = useCallback(e => {
    setIsChecked(e.target.checked)
  }, [])

  return (
    <span className={`Checkbox ${isChecked ? "Checkbox--checked" : ""}`}>
      <label htmlFor={id}>
        <span>{label}</span>
        <span className="Checkbox__icon">
          {isChecked && <img src={checkmark} alt="" />}
        </span>
      </label>
      <input type="checkbox" id={id} ref={ref} onChange={changeHandler} />
    </span>
  )
})

export default Checkbox
