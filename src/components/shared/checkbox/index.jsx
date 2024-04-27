import { forwardRef, useCallback, useEffect, useState } from "react"
import checkmark from "../../../assets/images/check.svg"
import { v4 as uuidv4 } from "uuid"
import "./checkbox.scss"

const Checkbox = forwardRef(({ label, id }, ref) => {
  const [isChecked, setIsChecked] = useState(ref?.current?.checked || false)
  const [uuid, setUuid] = useState(id)

  useEffect(() => {
    setUuid(`${id}-${uuidv4()}`)
  }, [id])

  const changeHandler = useCallback(e => {
    setIsChecked(e.target.checked)
  }, [])

  return (
    <span className={`Checkbox ${isChecked ? "Checkbox--checked" : ""}`}>
      <label htmlFor={uuid}>
        <span>{label}</span>
        <span className="Checkbox__icon">
          {isChecked && <img src={checkmark} alt="" />}
        </span>
      </label>
      <input type="checkbox" id={uuid} ref={ref} onChange={changeHandler} />
    </span>
  )
})

export default Checkbox
