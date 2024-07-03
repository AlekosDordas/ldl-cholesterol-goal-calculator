import { createContext, useState, useContext, useCallback } from "react"

const RiskContext = createContext()

export const RiskProvider = ({ children }) => {
  const [_risk, _setRisk] = useState({ initial: 0 })

  const updateRisk = useCallback((step, value) => {
    _setRisk(c => ({ ...c, [step]: Number(value) }))
  }, [])

  return (
    <RiskContext.Provider
      value={{ risk: Math.max(...Object.values(_risk)), updateRisk }}
    >
      {children}
    </RiskContext.Provider>
  )
}

export const useRisk = () => useContext(RiskContext)
