import { useEffect } from "react"
import { useStep } from "./providers/step"
import Header from "./components/header"
import Risk from "./components/risk"
import Step from "./components/shared/step"
import AscvdStep from "./components/steps/ascvd-step"
import DmStep from "./components/steps/dm-step"
import CkdStep from "./components/steps/ckd-step"
import AdditionalDataStep from "./components/steps/additional-data-step"

function App() {
  const { setStepOrder, nextStep, previousStep } = useStep()

  useEffect(() => {
    setStepOrder(["ascvd", "dm", "ckd", "additionalData"])
  }, [setStepOrder])

  return (
    <>
      <Header />
      <main>
        <Risk />
        <Step id="ascvd">
          <AscvdStep />
        </Step>
        <Step id="dm">
          <DmStep />
        </Step>
        <Step id="ckd">
          <CkdStep />
        </Step>
        <Step id="additionalData">
          <AdditionalDataStep />
        </Step>
        <Step id="finish">Finish</Step>
      </main>
      <footer>
        <button onClick={previousStep}>Previous</button>
        <button onClick={nextStep}>Next</button>
      </footer>
    </>
  )
}

export default App
