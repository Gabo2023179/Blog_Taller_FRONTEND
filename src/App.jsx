import { routes } from "./routes"
import "./index.css"
import { useRoutes } from "react-router-dom"

// Toma las rutas del archivo de rutas.
function App() {
  let elements = useRoutes(routes)
  return <>{elements}</>
}

export default App