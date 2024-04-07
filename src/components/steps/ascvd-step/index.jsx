import Checkbox from "../../shared/checkbox"
import { useStep } from "./use-step.hook"

const AscvdStep = () => {
  const {
    texts,
    acs,
    revascularization,
    stroke,
    pad,
    angio,
    carotid,
    handleFormChange,
  } = useStep()

  return (
    <form onChange={handleFormChange}>
      <h1>{texts.ascvdTitle}</h1>
      <h2>{texts.ascvdSubtitle}</h2>
      <Checkbox ref={acs} id="acs" label={texts.acsLabel} />
      <Checkbox
        ref={revascularization}
        id="revascularization"
        label={texts.revascularizationLabel}
      />
      <Checkbox ref={stroke} id="stroke" label={texts.strokeLabel} />
      <Checkbox ref={pad} id="pad" label={texts.padLabel} />
      <Checkbox ref={angio} id="angio" label={texts.angioLabel} />
      <Checkbox ref={carotid} id="carotid" label={texts.carotidLabel} />
    </form>
  )
}

export default AscvdStep
