import { forwardRef, useCallback, useEffect, useState } from "react"
import "./input.scss"

const NumberInput = forwardRef(({ min, step, id, label }, ref) => {
  const [value, setValue] = useState()

  useEffect(() => {
    if (Number(ref.current.value) <= Number(min)) {
      ref.current.value = min
      setValue(min)
    }
  }, [min, ref])

  const changeHandler = useCallback(() => {
    setValue(ref.current.value)
  }, [ref])

  const minusClickHandler = useCallback(
    e => {
      e.preventDefault()
      ref.current.stepDown()
      ref.current.dispatchEvent(new Event("change", { bubbles: true }))
    },
    [ref]
  )

  const plusClickHandler = useCallback(
    e => {
      e.preventDefault()
      ref.current.stepUp()
      ref.current.dispatchEvent(new Event("change", { bubbles: true }))
    },
    [ref]
  )

  return (
    <span className="NumberInput">
      <label htmlFor={id}>{label}</label>
      <div className="NumberInput__controller">
        <button
          className="NumberInput__minus"
          onClick={minusClickHandler}
          disabled={Number(value) <= Number(min)}
        >
          -
        </button>
        <input
          type="number"
          id={id}
          ref={ref}
          min={min}
          step={step}
          onChange={changeHandler}
        />
        <button className="NumberInput__plus" onClick={plusClickHandler}>
          +
        </button>
      </div>
    </span>
  )
})

export default NumberInput
