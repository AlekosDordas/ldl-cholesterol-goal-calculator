import { useCallback, useEffect, useRef } from "react"
import { useLanguage } from "../../../providers/language"
import { useRisk } from "../../../providers/risk"

export const useStep = () => {
  const { translatedContent: texts, reportingLanguageContent: reportingTexts } =
    useLanguage()
  const { updateRisk, updateAnswers } = useRisk()

  const acs = useRef()
  const revascularization = useRef()
  const stroke = useRef()
  const pad = useRef()
  const angio = useRef()
  const carotid = useRef()

  const submitAnswers = useCallback(() => {
    updateAnswers(reportingTexts.acsLabel, acs.current?.checked ? "Ναι" : "Όχι")
    updateAnswers(
      reportingTexts.revascularizationLabel,
      revascularization.current?.checked ? "Ναι" : "Όχι"
    )
    updateAnswers(
      reportingTexts.strokeLabel,
      stroke.current?.checked ? "Ναι" : "Όχι"
    )
    updateAnswers(reportingTexts.padLabel, pad.current?.checked ? "Ναι" : "Όχι")
    updateAnswers(
      reportingTexts.angioLabel,
      angio.current?.checked ? "Ναι" : "Όχι"
    )
    updateAnswers(
      reportingTexts.carotidLabel,
      carotid.current?.checked ? "Ναι" : "Όχι"
    )
  }, [reportingTexts, updateAnswers])

  const handleFormChange = useCallback(() => {
    acs.current?.checked ||
    revascularization.current?.checked ||
    stroke.current?.checked ||
    pad.current?.checked ||
    angio.current?.checked ||
    carotid.current?.checked
      ? updateRisk("ascvd", 4)
      : updateRisk("ascvd", 1)

    submitAnswers()
  }, [submitAnswers, updateRisk])

  useEffect(() => {
    submitAnswers()
  }, [submitAnswers])

  return {
    texts,
    acs,
    revascularization,
    stroke,
    pad,
    angio,
    carotid,
    handleFormChange,
  }
}
