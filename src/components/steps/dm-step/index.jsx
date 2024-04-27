import { Title, SecondaryTitle, Subtitle } from "../../shared/titles"
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
      <Title>{texts.dmTitle}</Title>
      <Subtitle>{texts.dmSubtitle}</Subtitle>
      <Checkbox ref={dm} id="dm" label={texts.dmLabel} />
      {hasDm && (
        <>
          <Checkbox
            ref={targetOrganDamage}
            id="targetOrganDamage"
            label={texts.targetOrganDamageLabel}
          />
          <SecondaryTitle>{texts.majorAscvdRiskFactorsTitle}</SecondaryTitle>
          <Subtitle>{texts.majorAscvdRiskFactorsSubtitle}</Subtitle>
          <Checkbox ref={htn} id="htn" label={texts.htnLabel} />
          <Checkbox ref={dyslip} id="dyslip" label={texts.dyslipLabel} />
          <Checkbox ref={smoker} id="smoker" label={texts.smokerLabel} />
          <Checkbox ref={family} id="family" label={texts.familyLabel} />
          <SecondaryTitle>{texts.onsetDurationTitle}</SecondaryTitle>
          <Subtitle>{texts.onsetDurationSubtitle}</Subtitle>
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
