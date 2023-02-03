import { motion } from "framer-motion";

import { Box } from "@material-ui/core";

import { varWrapEnter } from "./variants";

export default function MotionContainer({ open, children, ...other }) {
  return (
    <Box
      component={motion.div}
      initial={false}
      animate={open ? "animate" : "exit"}
      variants={varWrapEnter}
      {...other}
    >
      {children}
    </Box>
  );
}
