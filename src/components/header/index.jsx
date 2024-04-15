import Language from "./language"
import logo from "../../assets/images/logo.svg"
import "./index.scss"

const Header = () => {
  return (
    <header className="Header">
      <div className="Header__logo">
        <img src={logo} alt="" />
      </div>
      <div className="Header__title">LDL Cholesterol Goal Calculator</div>
      <div className="Header__language">
        <Language />
      </div>
    </header>
  )
}

export default Header
