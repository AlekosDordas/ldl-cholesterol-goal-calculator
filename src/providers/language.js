import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from "react"
import translations from "../data/translations.json"

const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("el")

  const availableLanguages = useMemo(() => ["el", "en", "fr", "it", "de"], [])

  const changeLanguage = useCallback(newLanguage => {
    const firstUrlPart = window.location.pathname.split("/")?.[1]
    if (firstUrlPart !== newLanguage) {
      window.history.pushState({}, "", `/${newLanguage}`)
    }
    setLanguage(newLanguage)
  }, [])

  useEffect(() => {
    document.documentElement.lang = language
    const firstUrlPart = window.location.pathname.split("/")?.[1]
    if (availableLanguages.includes(firstUrlPart) && firstUrlPart !== language)
      setLanguage(firstUrlPart)
  }, [setLanguage, language, availableLanguages])

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
        availableLanguages,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
