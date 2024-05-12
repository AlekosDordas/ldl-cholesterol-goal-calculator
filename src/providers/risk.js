import {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
  useEffect,
} from "react"
import { useLanguage } from "./language"

const RiskContext = createContext()

export const RiskProvider = ({ children }) => {
  const { reportingLanguageContent: reportingTexts } = useLanguage()
  const [_risk, _setRisk] = useState({ initial: 0 })
  const [answers, _setAnswers] = useState([
    { Risk: reportingTexts.lowRiskTitle },
  ])

  const maxRisk = useMemo(() => Math.max(...Object.values(_risk)), [_risk])

  const updateRisk = useCallback((step, value) => {
    _setRisk(c => ({ ...c, [step]: Number(value) }))
  }, [])

  useEffect(() => {
    _setAnswers(c => {
      if (maxRisk >= 4) {
        c[0] = { Risk: reportingTexts.veryHighRiskTitle }
      } else if (maxRisk >= 3) {
        c[0] = { Risk: reportingTexts.highRiskTitle }
      } else if (maxRisk >= 2) {
        c[0] = { Risk: reportingTexts.mediumRiskTitle }
      } else {
        c[0] = { Risk: reportingTexts.lowRiskTitle }
      }

      return c
    })
  }, [maxRisk, reportingTexts])

  const updateAnswers = useCallback((answer, value) => {
    _setAnswers(c => {
      const foundIndex = c.findIndex(o => o.hasOwnProperty(answer))
      if (foundIndex > -1) {
        c[foundIndex] = { [answer]: value }
      } else {
        c.push({ [answer]: value })
      }
      return c
    })
  }, [])

  return (
    <RiskContext.Provider
      value={{
        risk: maxRisk,
        updateRisk,
        answers,
        updateAnswers,
      }}
    >
      {children}
    </RiskContext.Provider>
  )
}

export const useRisk = () => useContext(RiskContext)
