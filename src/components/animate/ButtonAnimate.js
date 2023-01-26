import { Box } from "@material-ui/core";
import { motion } from "framer-motion";

import { varSmallClick, varMediumClick } from "./variants";

export default function ButtonAnimate({
  mediumClick = false,
  children,
  sx,
  ...other
}) {
  return (
    <Box
      component={motion.div}
      whileTap="tap"
      whileHover="hover"
      variants={mediumClick ? varMediumClick : varSmallClick}
      sx={{ display: "inline-flex", ...sx }}
      {...other}
    >
      {children}
    </Box>
  );
}
