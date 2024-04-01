import "./style.scss"

const Input = ({ type = "text", id, label, placeholder }) => (
  <span className="Input">
    <label htmlFor={id}>{label}</label>
    <input type={type} id={id} placeholder={placeholder} />
  </span>
)

export default Input
