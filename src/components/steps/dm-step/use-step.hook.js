import { useCallback, useRef, useState } from "react"
import { useLanguage } from "../../../providers/language"
import { useRisk } from "../../../providers/risk"

export const useStep = () => {
  const { translatedContent: texts } = useLanguage()
  const { updateRisk } = useRisk()

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
        htn.current,
        dyslip.current,
        smoker.current,
        family.current,
      ].filter(i => i?.checked).length

      if (
        checkedCount >= 3 ||
        targetOrganDamage.current?.checked ||
        t1dm.current?.checked
      ) {
        updateRisk("dm", 4)
      } else if (checkedCount >= 1 || long.current?.checked) {
        updateRisk("dm", 3)
      } else {
        updateRisk("dm", 2)
      }
    } else {
      setHasDm(false)
      updateRisk("dm", 1)
    }
  }, [updateRisk])

  return {
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
  }
}
