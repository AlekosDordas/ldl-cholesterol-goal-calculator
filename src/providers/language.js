import { createContext, useState, useContext } from "react"
import translations from "../data/translations.json"

const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en")
  const changeLanguage = newLanguage => {
    setLanguage(newLanguage)
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        changeLanguage,
        translatedContent: Object.fromEntries(
          Object.entries(translations).map(([text, value]) => [
            text,
            value[language],
          ])
        ),
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
