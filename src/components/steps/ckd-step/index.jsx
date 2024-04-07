import Checkbox from "../../shared/checkbox"
import Dropdown from "../../shared/dropdown"
import Input from "../../shared/input"
import { useStep } from "./use-step.hook"

const CkdStep = () => {
  const {
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
  } = useStep()

  return (
    <form onChange={handleFormChange}>
      <h1>{texts.ckdTitle}</h1>
      <h2>{texts.ckdSubtitle}</h2>
      {!showEgfrCalculator && (
        <>
          <Checkbox
            ref={severeCkd}
            id="severeCkd"
            label={texts.severeCkdLabel}
          />
          <Checkbox
            ref={moderateCkd}
            id="moderateCkd"
            label={texts.moderateCkdLabel}
          />
        </>
      )}
      <Checkbox ref={eGfrFind} id="eGfrFind" label={texts.eGfrFindLabel} />
      {showEgfrCalculator && (
        <>
          <h4>{texts.eGfrFindDescription}</h4>
          <Input
            type="number"
            min="0"
            step="0.1"
            ref={creatinine}
            id="creatinine"
            label={texts.creatinineLabel}
            placeholder={texts.creatininePlaceholder}
          />
          <Input
            type="number"
            min="0"
            step="1"
            ref={age}
            id="age"
            label={texts.ageLabel}
            placeholder={texts.agePlaceholder}
          />
          <Dropdown
            ref={sex}
            id="sex"
            label={texts.sexLabel}
            options={[
              { id: "male", label: texts.maleLabel },
              { id: "female", label: texts.femaleLabel },
            ]}
          />
          {egfrValue ? (
            <h4>eGFR: {egfrValue} ml/min/1.73m²</h4>
          ) : (
            <h4>{texts.creatinineAgeGenderMissing}</h4>
          )}
        </>
      )}
    </form>
  )
}

export default CkdStep
