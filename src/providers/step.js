import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react"
import { useRisk } from "./risk"

const StepContext = createContext()

export const StepProvider = ({ children }) => {
  const [step, setStep] = useState()
  const [stepOrder, setStepOrder] = useState([])
  const { risk } = useRisk()

  useEffect(() => {
    stepOrder.length && step === undefined && setStep(stepOrder[0])
  }, [stepOrder, step])

  const nextStep = useCallback(() => {
    if (!stepOrder.length || !step) return
    const currentIndex = stepOrder.indexOf(step)
    if (risk >= 4 || currentIndex >= stepOrder.length - 1) {
      setStep("finish")
    } else {
      setStep(stepOrder[currentIndex + 1])
    }
  }, [risk, step, stepOrder])

  const previousStep = useCallback(() => {
    if (!stepOrder.length || !step) return
    const currentIndex = stepOrder.indexOf(step)
    if (currentIndex > 0) {
      setStep(stepOrder[currentIndex - 1])
    }
  }, [step, stepOrder])

  return (
    <StepContext.Provider
      value={{ step, setStepOrder, nextStep, previousStep }}
    >
      {children}
    </StepContext.Provider>
  )
}

export const useStep = () => useContext(StepContext)
