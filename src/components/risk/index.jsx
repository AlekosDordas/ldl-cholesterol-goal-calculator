import { useEffect, useState } from "react"
import { useRisk } from "../../providers/risk"
import { useLanguage } from "../../providers/language"
import lowRiskIcon from "../../assets/images/low-risk.svg"
import mediumRiskIcon from "../../assets/images/medium-risk.svg"
import highRiskIcon from "../../assets/images/high-risk.svg"
import veryHighRiskIcon from "../../assets/images/very-high-risk.svg"
import "./risk.scss"
import { useStep } from "../../providers/step"

const Risk = () => {
  const { translatedContent: texts } = useLanguage()
  const { risk } = useRisk()
  const { hasFinished } = useStep()

  const [icon, setIcon] = useState()
  const [title, setTitle] = useState()
  const [subtitle, setSubtitle] = useState()
  const [riskClassSuffix, setRiskClassSuffix] = useState()

  useEffect(() => {
    if (risk && risk > 0) {
      if (risk >= 4) {
        setIcon(veryHighRiskIcon)
        setTitle(texts.veryHighRiskTitle)
        setSubtitle(texts.veryHighRiskSubtitle)
        setRiskClassSuffix("veryHigh")
      } else if (risk >= 3) {
        setIcon(highRiskIcon)
        setTitle(texts.highRiskTitle)
        setSubtitle(texts.highRiskSubtitle)
        setRiskClassSuffix("high")
      } else if (risk >= 2) {
        setIcon(mediumRiskIcon)
        setTitle(texts.mediumRiskTitle)
        setSubtitle(texts.mediumRiskSubtitle)
        setRiskClassSuffix("medium")
      } else {
        setIcon(lowRiskIcon)
        setTitle(texts.lowRiskTitle)
        setSubtitle(texts.lowRiskSubtitle)
        setRiskClassSuffix("low")
      }
    }
  }, [risk, texts])

  return (
    <div
      className={`Risk
        ${riskClassSuffix ? `Risk--${riskClassSuffix}` : ""}
        ${hasFinished ? "Risk--finished" : ""}
      `}
    >
      <div className="Risk__wrapper">
        <img className="Risk__icon" src={icon} alt="" />
        <div className="Risk__text">
          <div className="Risk__title">{title}</div>
          <div className="Risk__subtitle">{subtitle}</div>
          <div className="Risk__finish-text">{texts.riskModifiers}</div>
        </div>
      </div>
    </div>
  )
}

export default Risk
