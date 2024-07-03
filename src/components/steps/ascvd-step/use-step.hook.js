import { useCallback, useRef } from "react"
import { useLanguage } from "../../../providers/language"
import { useRisk } from "../../../providers/risk"

export const useStep = () => {
  const { translatedContent: texts } = useLanguage()
  const { updateRisk } = useRisk()

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
      ? updateRisk("ascvd", 4)
      : updateRisk("ascvd", 1)
  }, [updateRisk])

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
