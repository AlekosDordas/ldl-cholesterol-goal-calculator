import { useLanguage } from "../../../providers/language"
import Checkbox from "../../shared/checkbox"

const AscvdStep = () => {
  const { translatedContent: texts } = useLanguage()

  return (
    <>
      <h1>{texts.ascvdTitle}</h1>
      <h2>{texts.ascvdSubtitle}</h2>
      <Checkbox id="acs" label={texts.acsLabel} />
      <Checkbox id="revascularization" label={texts.revascularizationLabel} />
      <Checkbox id="stroke" label={texts.strokeLabel} />
      <Checkbox id="pad" label={texts.padLabel} />
      <Checkbox id="angio" label={texts.angioLabel} />
      <Checkbox id="carotid" label={texts.carotidLabel} />
    </>
  )
}

export default AscvdStep
