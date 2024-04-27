import { useStep } from "../../../providers/step"
import "./step.scss"

const Step = ({ id, children }) => {
  const { step, hasFinished } = useStep()

  return (
    <div className={`Step ${step === id && !hasFinished ? "is-visible" : ""}`}>
      {children}
    </div>
  )
}

export default Step
