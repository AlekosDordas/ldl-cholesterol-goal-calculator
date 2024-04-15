import { useCallback } from "react"
import { useLanguage } from "../../providers/language"
import GrFlag from "../../assets/images/gr_flag.svg"
import EnFlag from "../../assets/images/uk_flag.svg"
import "./language.scss"

const Language = () => {
  const { language, changeLanguage } = useLanguage()

  const changeLanguageHandler = useCallback(() => {
    language === "en" ? changeLanguage("el") : changeLanguage("en")
  }, [changeLanguage, language])

  return (
    <button className="Language" onClick={changeLanguageHandler}>
      {language === "en" ? (
        <img src={GrFlag} alt="Switch Language" />
      ) : (
        <img src={EnFlag} alt="Switch Language" />
      )}
    </button>
  )
}

export default Language
