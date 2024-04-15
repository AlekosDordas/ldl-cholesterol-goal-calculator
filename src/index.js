import React from "react"
import ReactDOM from "react-dom/client"
import "./index.scss"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { StepProvider } from "./providers/step"
import { LanguageProvider } from "./providers/language"
import { RiskProvider } from "./providers/risk"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <LanguageProvider>
      <RiskProvider>
        <StepProvider>
          <App />
        </StepProvider>
      </RiskProvider>
    </LanguageProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
