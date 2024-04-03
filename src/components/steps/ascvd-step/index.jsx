import { useCallback, useRef } from "react"
import { useLanguage } from "../../../providers/language"
import { useRisk } from "../../../providers/risk"
import Checkbox from "../../shared/checkbox"

const AscvdStep = () => {
  const { translatedContent: texts } = useLanguage()
  const { setRisk } = useRisk()

  const acs = useRef()
  const revascularization = useRef()
  const stroke = useRef()
  const pad = useRef()
  const angio = useRef()
  const carotid = useRef()

  const handleFormChange = useCallback(() => {
    acs.current?.checked ||
    revascularization.current?.checked ||
    stroke.current?.checked ||
    pad.current?.checked ||
    angio.current?.checked ||
    carotid.current?.checked
      ? setRisk(4)
      : setRisk(1)
  }, [setRisk])

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
