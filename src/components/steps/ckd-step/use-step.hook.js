import { useCallback, useEffect, useRef, useState } from "react"
import { useLanguage } from "../../../providers/language"
import { useRisk } from "../../../providers/risk"

export const useStep = () => {
  const { translatedContent: texts, reportingLanguageContent: reportingTexts } =
    useLanguage()
  const { updateRisk, updateAnswers } = useRisk()

  const severeCkd = useRef()
  const moderateCkd = useRef()
  const eGfrFind = useRef()
  const creatinine = useRef()
  const age = useRef()
  const sex = useRef()

  const [severeValue, setSevereValue] = useState(
    severeCkd.current?.checked || false
  )
  const [moderateValue, setModerateValue] = useState(
    moderateCkd.current?.checked || false
  )
  const [egfrValue, setEgfrValue] = useState()
  const [showEgfrCalculator, setShowEgfrCalculator] = useState(
    eGfrFind.current?.checked || false
  )

  const calculateEgfr = useCallback(
    ({ creatinineLevel, selectedAge, selectedSex }) => {
      if (selectedSex === "female") {
        if (creatinineLevel <= 0.7) {
          setEgfrValue(
            Math.round(
              143 *
                Math.pow(creatinineLevel / 0.7, -0.241) *
                Math.pow(0.9938, selectedAge)
            )
          )
        } else {
          setEgfrValue(
            Math.round(
              143 *
                Math.pow(creatinineLevel / 0.7, -1.2) *
                Math.pow(0.9938, selectedAge)
            )
          )
        }
      } else {
        if (creatinineLevel <= 0.9) {
          setEgfrValue(
            Math.round(
              142 *
                Math.pow(creatinineLevel / 0.9, -0.302) *
                Math.pow(0.9938, selectedAge)
            )
          )
        } else {
          setEgfrValue(
            Math.round(
              142 *
                Math.pow(creatinineLevel / 0.9, -1.2) *
                Math.pow(0.9938, selectedAge)
            )
          )
        }
      }
    },
    []
  )

  const submitAnswers = useCallback(() => {
    updateAnswers(
      reportingTexts.ckdSubtitle,
      severeValue || moderateValue || typeof egfrValue === "number"
        ? severeValue
          ? reportingTexts.severeCkdLabel
          : moderateValue
          ? reportingTexts.moderateCkdLabel
          : egfrValue + " ml/min/1.73m²"
        : ""
    )
  }, [egfrValue, moderateValue, reportingTexts, severeValue, updateAnswers])

  useEffect(() => {
    if ((egfrValue && egfrValue < 30) || severeValue) {
      updateRisk("ckd", 4)
    } else if (
      (egfrValue && egfrValue >= 30 && egfrValue < 60) ||
      moderateValue
    ) {
      updateRisk("ckd", 3)
    } else {
      updateRisk("ckd", 1)
    }

    submitAnswers()
  }, [egfrValue, moderateValue, severeValue, submitAnswers, updateRisk])

  const handleFormChange = useCallback(() => {
    if (eGfrFind.current?.checked) {
      setShowEgfrCalculator(true)
      const creatinineLevel = Number(creatinine.current?.value)
      const selectedSex = sex.current?.value
      const selectedAge = Number(age.current?.value)

      if (creatinineLevel && selectedAge && selectedSex) {
        calculateEgfr({ creatinineLevel, selectedAge, selectedSex })
      } else {
        setEgfrValue(null)
      }
    } else {
      setShowEgfrCalculator(false)
      setEgfrValue(null)
    }

    setSevereValue(severeCkd.current?.checked || false)
    setModerateValue(moderateCkd.current?.checked || false)
    submitAnswers()
  }, [calculateEgfr, submitAnswers])

  return {
    texts,
    severeCkd,
    moderateCkd,
    eGfrFind,
    creatinine,
    age,
    sex,
    egfrValue,
    showEgfrCalculator,
    handleFormChange,
  }
}
