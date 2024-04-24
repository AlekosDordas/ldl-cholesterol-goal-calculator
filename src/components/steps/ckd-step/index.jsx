import { Title, Subtitle } from "../../shared/titles"
import Checkbox from "../../shared/checkbox"
import Dropdown from "../../shared/dropdown"
import NumberInput from "../../shared/number-input"
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
      <Title>{texts.ckdTitle}</Title>
      <Subtitle>{texts.ckdSubtitle}</Subtitle>
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
          <NumberInput
            min="0"
            step="0.1"
            ref={creatinine}
            id="creatinine"
            label={texts.creatinineLabel}
          />
          <NumberInput
            min="0"
            step="1"
            ref={age}
            id="age"
            label={texts.ageLabel}
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
