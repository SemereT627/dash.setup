import { forwardRef } from "react";
import { useTheme } from "@material-ui/core/styles";
import { Fab } from "@material-ui/core";

import { ButtonAnimate } from "../animate";

const MFab = forwardRef(
  ({ color = "primary", children, sx, ...other }, ref) => {
    const theme = useTheme();

    if (
      color === "default" ||
      color === "inherit" ||
      color === "primary" ||
      color === "secondary"
    ) {
      return (
        <ButtonAnimate>
          <Fab ref={ref} color={color} sx={sx} {...other}>
            {children}
          </Fab>
        </ButtonAnimate>
      );
    }

    return (
      <ButtonAnimate>
        <Fab
          ref={ref}
          sx={{
            boxShadow: theme.customShadows[color],
            color: theme.palette[color].contrastText,
            bgcolor: theme.palette[color].main,
            "&:hover": {
              bgcolor: theme.palette[color].dark,
            },
            ...sx,
          }}
          {...other}
        >
          {children}
        </Fab>
      </ButtonAnimate>
    );
  }
);

export default MFab;
