import { useCallback, useRef, useState } from "react"
import { useLanguage } from "../../../providers/language"
import { useRisk } from "../../../providers/risk"
import Checkbox from "../../shared/checkbox"

const DmStep = () => {
  const { translatedContent: texts } = useLanguage()
  const { setRisk } = useRisk()

  const dm = useRef()
  const targetOrganDamage = useRef()
  const htn = useRef()
  const dyslip = useRef()
  const smoker = useRef()
  const family = useRef()
  const youngRecent = useRef()
  const long = useRef()
  const t1dm = useRef()

  const [hasDm, setHasDm] = useState(dm.current?.checked || false)

  const handleFormChange = useCallback(() => {
    if (dm.current?.checked) {
      setHasDm(true)
      const checkedCount = [
        targetOrganDamage.current,
        htn.current,
        dyslip.current,
        smoker.current,
        family.current,
        youngRecent.current,
        long.current,
        t1dm.current,
      ].filter(i => i?.checked).length

      if (
        checkedCount >= 3 ||
        targetOrganDamage.current?.checked ||
        t1dm.current?.checked
      ) {
        setRisk(4)
      } else if (checkedCount >= 1 || long.current?.checked) {
        setRisk(3)
      } else {
        setRisk(2)
      }
    } else {
      setHasDm(false)
      setRisk(1)
    }
  }, [setRisk])

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
