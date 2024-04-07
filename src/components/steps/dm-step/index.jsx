import Checkbox from "../../shared/checkbox"
import { useStep } from "./use-step.hook"

const DmStep = () => {
  const {
    texts,
    dm,
    targetOrganDamage,
    htn,
    dyslip,
    smoker,
    family,
    youngRecent,
    long,
    t1dm,
    hasDm,
    handleFormChange,
  } = useStep()

  return (
    <form onChange={handleFormChange}>
      <h1>{texts.dmTitle}</h1>
      <h2>{texts.dmSubtitle}</h2>
      <Checkbox ref={dm} id="dm" label={texts.dmLabel} />
      {hasDm && (
        <>
          <Checkbox
            ref={targetOrganDamage}
            id="targetOrganDamage"
            label={texts.targetOrganDamageLabel}
          />
          <h2>{texts.majorAscvdRiskFactorsTitle}</h2>
          <Checkbox ref={htn} id="htn" label={texts.htnLabel} />
          <Checkbox ref={dyslip} id="dyslip" label={texts.dyslipLabel} />
          <Checkbox ref={smoker} id="smoker" label={texts.smokerLabel} />
          <Checkbox ref={family} id="family" label={texts.familyLabel} />
          <h2>{texts.onsetDurationTitle}</h2>
          <Checkbox
            ref={youngRecent}
            id="youngRecent"
            label={texts.youngRecentLabel}
          />
          <Checkbox ref={long} id="long" label={texts.longLabel} />
          <Checkbox ref={t1dm} id="t1dm" label={texts.t1dmLabel} />
        </>
      )}
    </form>
  )
}

export default DmStep
