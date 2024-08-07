import "./titles.scss"

const Title = ({ children }) => <h1 className="Title">{children}</h1>

const SecondaryTitle = ({ children }) => (
  <h2 className="SecondaryTitle">{children}</h2>
)

const Subtitle = ({ children }) => <h2 className="Subtitle">{children}</h2>

export { Title, SecondaryTitle, Subtitle }
