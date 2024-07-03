import { useCallback } from "react"
import { useLanguage } from "../../providers/language"
import GrFlag from "../../assets/images/gr_flag.svg"
import EnFlag from "../../assets/images/uk_flag.svg"
import FrFlag from "../../assets/images/fr_flag.svg"
import ItFlag from "../../assets/images/it_flag.svg"
import DeFlag from "../../assets/images/de_flag.svg"
import "./language.scss"

const Language = () => {
  const { language, changeLanguage, availableLanguages } = useLanguage()
  const flags = {
    el: GrFlag,
    en: EnFlag,
    fr: FrFlag,
    it: ItFlag,
    de: DeFlag,
  }

  const changeLanguageHandler = useCallback(
    lang => {
      availableLanguages.includes(lang) && changeLanguage(lang)
    },
    [availableLanguages, changeLanguage]
  )

  return (
    <>
      {availableLanguages.map(lang => (
        <button
          className={`Language ${
            lang === language ? "Language--selected" : ""
          }`}
          onClick={() => changeLanguageHandler(lang)}
        >
          {flags[lang] ? (
            <img src={flags[lang]} alt="Switch Language" />
          ) : (
            <span>{lang}</span>
          )}
        </button>
      ))}
    </>
  )
}

export default Language
