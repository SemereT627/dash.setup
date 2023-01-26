import { useContext } from "react";
import { CollapseDrawerContext } from "../contexts/CollapsibleDrawerContext";

const useCollapseDrawer = () => useContext(CollapseDrawerContext);

export default useCollapseDrawer;
