// React components
import { useContext } from "react"

// Context
import ExaminationsLayoutConfigContext from "./context"

const useExaminationsLayoutConfig = () => useContext(ExaminationsLayoutConfigContext);

export default useExaminationsLayoutConfig;