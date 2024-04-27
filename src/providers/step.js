import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from "react"
import { useRisk } from "./risk"

const StepContext = createContext()

export const StepProvider = ({ children }) => {
  const [step, setStep] = useState()
  const [stepOrder, setStepOrder] = useState([])
  const [shouldFinish, setShouldFinish] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)
  const { risk } = useRisk()

  useEffect(() => {
    stepOrder.length && step === undefined && setStep(stepOrder[0])
  }, [stepOrder, step])

  useEffect(() => {
    setShouldFinish(
      stepOrder?.indexOf(step) === stepOrder?.length - 1 || risk >= 4
    )
  }, [risk, step, stepOrder])

  const _finish = useCallback(() => {
    setHasFinished(true)
  }, [])

  const _restart = useCallback(() => {
    window.location.reload()
  }, [])

  const nextStep = useCallback(() => {
    if (!stepOrder.length || !step) return
    const currentIndex = stepOrder.indexOf(step)
    if (hasFinished) {
      _restart()
    } else if (shouldFinish) {
      _finish()
    } else {
      setStep(stepOrder[currentIndex + 1])
    }
  }, [_finish, _restart, hasFinished, shouldFinish, step, stepOrder])

  const previousStep = useCallback(() => {
    if (!stepOrder.length || !step) return
    const currentIndex = stepOrder.indexOf(step)
    if (currentIndex > 0) {
      setStep(stepOrder[currentIndex - 1])
    }
  }, [step, stepOrder])

  const isFirst = useMemo(
    () => stepOrder?.indexOf(step) === 0,
    [step, stepOrder]
  )

  return (
    <StepContext.Provider
      value={{
        step,
        setStepOrder,
        nextStep,
        previousStep,
        isFirst,
        shouldFinish,
        hasFinished,
      }}
    >
      {children}
    </StepContext.Provider>
  )
}

export const useStep = () => useContext(StepContext)
