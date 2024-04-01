import { useLanguage } from "../../../providers/language"
import Checkbox from "../../shared/checkbox"

const DmStep = () => {
  const { translatedContent: texts } = useLanguage()

  return (
    <>
      <h1>{texts.dmTitle}</h1>
      <h2>{texts.dmSubtitle}</h2>
      <Checkbox id="dm" label={texts.dmLabel} />
      <Checkbox id="targetOrganDamage" label={texts.targetOrganDamageLabel} />
      <h2>{texts.majorAscvdRiskFactorsTitle}</h2>
      <Checkbox id="htn" label={texts.htnLabel} />
      <Checkbox id="dyslip" label={texts.dyslipLabel} />
      <Checkbox id="smoker" label={texts.smokerLabel} />
      <Checkbox id="family" label={texts.familyLabel} />
      <h2>{texts.onsetDurationTitle}</h2>
      <Checkbox id="youngRecent" label={texts.youngRecentLabel} />
      <Checkbox id="long" label={texts.longLabel} />
      <Checkbox id="t1dm" label={texts.t1dmLabel} />
    </>
  )
}

export default DmStep
