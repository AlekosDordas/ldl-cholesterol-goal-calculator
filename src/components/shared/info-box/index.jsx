import { Title, Subtitle } from "../titles"
import "./info-box.scss"

const InfoBox = ({ title, subtitle, warning = false }) => (
  <div className={`InfoBox ${warning ? "InfoBox--warning" : ""}`}>
    {title && <Title>{title}</Title>}
    {subtitle && <Subtitle>{subtitle}</Subtitle>}
  </div>
)

export default InfoBox
