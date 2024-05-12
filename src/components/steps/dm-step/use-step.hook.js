import { useEffect, useCallback, useRef, useState } from "react"
import { useLanguage } from "../../../providers/language"
import { useRisk } from "../../../providers/risk"

export const useStep = () => {
  const { translatedContent: texts, reportingLanguageContent: reportingTexts } =
    useLanguage()
  const { updateRisk, updateAnswers } = useRisk()

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

  const submitAnswers = useCallback(() => {
    updateAnswers(
      reportingTexts.dmSubtitle,
      dm.current?.checked ? "Ναι" : "Όχι"
    )
    updateAnswers(
      reportingTexts.targetOrganDamageLabel,
      hasDm ? (targetOrganDamage.current?.checked ? "Ναι" : "Όχι") : ""
    )
    updateAnswers(
      reportingTexts.htnLabel,
      hasDm ? (htn.current?.checked ? "Ναι" : "Όχι") : ""
    )
    updateAnswers(
      reportingTexts.dyslipLabel,
      hasDm ? (dyslip.current?.checked ? "Ναι" : "Όχι") : ""
    )
    updateAnswers(
      reportingTexts.smokerLabel,
      hasDm ? (smoker.current?.checked ? "Ναι" : "Όχι") : ""
    )
    updateAnswers(
      reportingTexts.familyLabel,
      hasDm ? (family.current?.checked ? "Ναι" : "Όχι") : ""
    )
    updateAnswers(
      reportingTexts.youngRecentLabel,
      hasDm ? (youngRecent.current?.checked ? "Ναι" : "Όχι") : ""
    )
    updateAnswers(
      reportingTexts.longLabel,
      hasDm ? (long.current?.checked ? "Ναι" : "Όχι") : ""
    )
    updateAnswers(
      reportingTexts.t1dmLabel,
      hasDm ? (t1dm.current?.checked ? "Ναι" : "Όχι") : ""
    )
  }, [reportingTexts, updateAnswers, hasDm])

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

    submitAnswers()
  }, [submitAnswers, updateRisk])

  useEffect(() => {
    submitAnswers()
  }, [submitAnswers])

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
