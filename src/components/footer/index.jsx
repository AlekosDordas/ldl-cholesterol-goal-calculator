import { useStep } from "../../providers/step"
import { useLanguage } from "../../providers/language"
import "./footer.scss"

const Footer = () => {
  const { nextStep, previousStep, isFirst, isLast } = useStep()
  const { translatedContent: texts } = useLanguage()

  return (
    <footer className="Footer">
      <nav className="Footer__nav">
        {!isFirst && (
          <button className="Footer__nav-button" onClick={previousStep}>
            {texts.previousLabel}
          </button>
        )}
        <button
          className="Footer__nav-button Footer__nav-button--primary"
          onClick={nextStep}
        >
          {!isLast ? texts.nextLabel : texts.finishLabel}
        </button>
      </nav>
      <hr />
      <div className="Footer__credits">
        <span>
          {texts.creditsLine1}
          <br />
          {texts.creditsLine2}
        </span>
      </div>
    </footer>
  )
}

export default Footer
