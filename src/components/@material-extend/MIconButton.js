import { forwardRef } from "react";
import { IconButton } from "@material-ui/core";

import { ButtonAnimate } from "../animate";

const MIconButton = forwardRef(({ children, ...other }, ref) => (
  <ButtonAnimate>
    <IconButton ref={ref} {...other}>
      {children}
    </IconButton>
  </ButtonAnimate>
));

export default MIconButton;
