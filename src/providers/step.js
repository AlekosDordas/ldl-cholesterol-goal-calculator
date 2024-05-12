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
  const [hasStoredAnswers, setHasStoredAnswers] = useState(false)
  const { risk, answers } = useRisk()

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

  const _storeAnswer = useCallback(async () => {
    const API_URL = "https://api.jsonbin.io/v3/b/66401926ad19ca34f8680122"
    const API_KEY =
      "$2a$10$4GNrZvdiG1zVTXIUHrw8QeEM07Y2S.i47iIILWezs3lUKCNCY1Isy"

    const headers = {
      "Content-Type": "application/json",
      "X-Master-Key": API_KEY,
    }

    try {
      const getResponse = await fetch(`${API_URL}/latest`, {
        method: "GET",
        headers,
      })

      const { record: existingRecords } = await getResponse.json()

      answers.unshift({ Date: new Date() })
      existingRecords.push(answers)

      const updateResponse = await fetch(API_URL, {
        method: "PUT",
        headers,
        body: JSON.stringify(existingRecords),
      })

      await updateResponse.json()
      setHasStoredAnswers(true)
    } catch (error) {
      setHasStoredAnswers(true)
      console.error("An error occurred while storing the answer: ", error)
    }
  }, [answers])

  const nextStep = useCallback(() => {
    if (!stepOrder.length || !step) return
    const currentIndex = stepOrder.indexOf(step)
    if (hasFinished) {
      _restart()
    } else if (shouldFinish) {
      _finish()
      _storeAnswer()
    } else {
      setStep(stepOrder[currentIndex + 1])
    }
  }, [
    _finish,
    _restart,
    _storeAnswer,
    hasFinished,
    shouldFinish,
    step,
    stepOrder,
  ])

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
        hasStoredAnswers,
      }}
    >
      {children}
    </StepContext.Provider>
  )
}

export const useStep = () => useContext(StepContext)
