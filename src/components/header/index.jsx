import Language from "./language"
import logo from "../../assets/images/logo.svg"
import "./header.scss"
import { useLanguage } from "../../providers/language"

const Header = () => {
  const { translatedContent: texts } = useLanguage()

  return (
    <header className="Header">
      <div className="Header__logo">
        <img src={logo} alt="" />
      </div>
      <div className="Header__title">{texts.headerTitle}</div>
      <div className="Header__language">
        <Language />
      </div>
    </header>
  )
}

export default Header
