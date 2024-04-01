import { useLanguage } from "../../../providers/language"
import Checkbox from "../../shared/checkbox"
import Dropdown from "../../shared/dropdown"
import Input from "../../shared/input"

const AdditionalDataStep = () => {
  const { translatedContent: texts } = useLanguage()

  return (
    <>
      <h1>{texts.additionalDataTitle}</h1>
      <h2>{texts.additionalDataSubtitle}</h2>
      <h3>{texts.additionalDataSecondSubtitle}</h3>
      <Input
        type="number"
        id="age"
        label={texts.ageLabel}
        placeholder={texts.agePlaceholder}
      />
      <Input type="number" id="sbp" label={texts.sbpLabel} />
      <Input type="number" id="dbp" label={texts.dbpLabel} />
      <Input type="number" id="tc" label={texts.tcLabel} />
      <Input type="number" id="hdl" label={texts.hdlLabel} />
      <Input type="number" id="ldl" label={texts.ldlLabel} />
      <Checkbox id="smoker" label={texts.smokerLabel} />
      <Dropdown
        id="sex"
        label={texts.sexLabel}
        options={[
          { id: "male", label: texts.maleLabel },
          { id: "female", label: texts.femaleLabel },
        ]}
      />
    </>
  )
}

export default AdditionalDataStep
