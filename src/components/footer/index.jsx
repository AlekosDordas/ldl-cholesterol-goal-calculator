import { useStep } from "../../providers/step"
import { useLanguage } from "../../providers/language"
import "./footer.scss"

const Footer = () => {
  const { nextStep, previousStep, isFirst, shouldFinish, hasFinished } =
    useStep()
  const { translatedContent: texts } = useLanguage()

  return (
    <footer className="Footer">
      <nav className="Footer__nav">
        {!isFirst && !hasFinished && (
          <button className="Footer__nav-button" onClick={previousStep}>
            {texts.previousLabel}
          </button>
        )}
        <button
          className="Footer__nav-button Footer__nav-button--primary"
          onClick={nextStep}
        >
          {hasFinished
            ? texts.restartLabel
            : shouldFinish
            ? texts.finishLabel
            : texts.nextLabel}
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
