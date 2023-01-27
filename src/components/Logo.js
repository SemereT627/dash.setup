import { Box } from "@material-ui/core";

export default function Logo({ sx }) {
  return (
    <Box sx={{ width: 40, height: 40, ...sx }}>
      <img src="/static/logo.png" alt="fitness-logo" />
    </Box>
  );
}
