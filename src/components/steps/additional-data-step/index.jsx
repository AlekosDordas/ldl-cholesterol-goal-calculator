import { Title, Subtitle } from "../../shared/titles"
import Checkbox from "../../shared/checkbox"
import Dropdown from "../../shared/dropdown"
import NumberInput from "../../shared/number-input"
import { useStep } from "./use-step.hook"

const AdditionalDataStep = () => {
  const {
    texts,
    age,
    sbp,
    dbp,
    tc,
    hdl,
    ldl,
    smoker,
    sex,
    ready,
    score2,
    handleFormChange,
  } = useStep()

  return (
    <form onChange={handleFormChange}>
      {!ready && <div>Form is not ready</div>}
      {score2 && <div>10 year risk of CV event: {score2}%</div>}
      <Title>{texts.additionalDataTitle}</Title>
      <Subtitle>{texts.additionalDataSubtitle}</Subtitle>
      <NumberInput min="0" ref={age} id="age" label={texts.ageLabel} />
      <NumberInput min="0" ref={sbp} id="sbp" label={texts.sbpLabel} />
      <NumberInput min="0" ref={dbp} id="dbp" label={texts.dbpLabel} />
      <NumberInput min="0" ref={tc} id="tc" label={texts.tcLabel} />
      <NumberInput min="0" ref={hdl} id="hdl" label={texts.hdlLabel} />
      <NumberInput min="0" ref={ldl} id="ldl" label={texts.ldlLabel} />
      <Checkbox ref={smoker} id="smoker" label={texts.smokerLabel} />
      <Dropdown
        ref={sex}
        id="sex"
        label={texts.sexLabel}
        options={[
          { id: "male", label: texts.maleLabel },
          { id: "female", label: texts.femaleLabel },
        ]}
      />
    </form>
  )
}

export default AdditionalDataStep
