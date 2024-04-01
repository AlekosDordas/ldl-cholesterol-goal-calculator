import { LanguageProvider } from "./providers/language"
import AscvdStep from "./components/steps/ascvd-step"
import DmStep from "./components/steps/dm-step"
import CkdStep from "./components/steps/ckd-step"
import AdditionalDataStep from "./components/steps/additional-data-step"

function App() {
  return (
    <LanguageProvider>
      <main>
        <header></header>
        <form>
          <AscvdStep />
          <DmStep />
          <CkdStep />
          <AdditionalDataStep />
        </form>
        <footer></footer>
      </main>
    </LanguageProvider>
  )
}

export default App
