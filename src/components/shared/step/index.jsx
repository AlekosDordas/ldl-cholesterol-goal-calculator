import { useStep } from "../../../providers/step"
import "./step.scss"

const Step = ({ id, children }) => {
  const { step } = useStep()

  return (
    <div className={`Step ${step === id ? "is-visible" : ""}`}>{children}</div>
  )
}

export default Step
