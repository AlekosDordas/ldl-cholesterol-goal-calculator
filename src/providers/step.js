import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react"

const StepContext = createContext()

export const StepProvider = ({ children }) => {
  const [step, setStep] = useState()
  const [stepOrder, setStepOrder] = useState([])

  useEffect(() => {
    stepOrder.length && step === undefined && setStep(stepOrder[0])
  }, [stepOrder, step])

  const nextStep = useCallback(() => {
    if (!stepOrder.length || !step) return
    const currentIndex = stepOrder.indexOf(step)
    if (currentIndex < stepOrder.length - 1) {
      setStep(stepOrder[currentIndex + 1])
    }
  }, [step, stepOrder])

  const previousStep = useCallback(() => {
    if (!stepOrder.length || !step) return
    const currentIndex = stepOrder.indexOf(step)
    if (currentIndex > 0) {
      setStep(stepOrder[currentIndex - 1])
    }
  }, [step, stepOrder])

  const changeStep = useCallback(newStep => {
    setStep(newStep)
  }, [])

  return (
    <StepContext.Provider
      value={{ step, changeStep, setStepOrder, nextStep, previousStep }}
    >
      {children}
    </StepContext.Provider>
  )
}

export const useStep = () => useContext(StepContext)
