import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react"
import translations from "../data/translations.json"

const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en")

  const changeLanguage = useCallback(newLanguage => {
    const firstUrlPart = window.location.pathname.split("/")?.[1]
    if (firstUrlPart !== newLanguage) {
      window.history.pushState({}, "", `/${newLanguage}`)
    }
    setLanguage(newLanguage)
  }, [])

  useEffect(() => {
    const firstUrlPart = window.location.pathname.split("/")?.[1]
    if (["en", "el"].includes(firstUrlPart) && firstUrlPart !== language)
      setLanguage(firstUrlPart)
  }, [setLanguage, language])

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
