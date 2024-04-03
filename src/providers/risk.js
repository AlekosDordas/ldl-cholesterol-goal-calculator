import { createContext, useState, useContext } from "react"

const RiskContext = createContext()

export const RiskProvider = ({ children }) => {
  const [risk, setRisk] = useState()

  return (
    <RiskContext.Provider value={{ risk, setRisk }}>
      {children}
    </RiskContext.Provider>
  )
}

export const useRisk = () => useContext(RiskContext)
