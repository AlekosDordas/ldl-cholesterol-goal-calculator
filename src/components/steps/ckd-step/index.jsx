import { useLanguage } from "../../../providers/language"
import Checkbox from "../../shared/checkbox"
import Dropdown from "../../shared/dropdown"
import Input from "../../shared/input"

const CkdStep = () => {
  const { translatedContent: texts } = useLanguage()

  return (
    <>
      <h1>{texts.ckdTitle}</h1>
      <h2>{texts.ckdSubtitle}</h2>
      <Checkbox id="severeCkd" label={texts.severeCkdLabel} />
      <Checkbox id="moderateCkd" label={texts.moderateCkdLabel} />
      <Checkbox id="eGfrFind" label={texts.eGfrFindLabel} />
      <h4>{texts.eGfrFindDescription}</h4>
      <Input
        type="number"
        id="creatinine"
        label={texts.creatinineLabel}
        placeholder={texts.creatininePlaceholder}
      />
      <Input
        type="number"
        id="age"
        label={texts.ageLabel}
        placeholder={texts.agePlaceholder}
      />
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

export default CkdStep
