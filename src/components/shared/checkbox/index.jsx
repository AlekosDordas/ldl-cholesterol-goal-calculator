import "./style.scss"

const Checkbox = ({ label, id }) => (
  <span className="Checkbox">
    <label htmlFor={id}>{label}</label>
    <input type="checkbox" id={id} />
  </span>
)

export default Checkbox
