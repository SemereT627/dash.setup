import { isString } from "lodash";

import { Box, Typography, Link } from "@material-ui/core";
import { MBreadcrumbs } from "./@material-extend";

export default function HeaderBreadcrumbs({
  links,
  action,
  heading,
  moreLink = "" || [],
  sx,
  ...other
}) {
    return (
      <Box sx={{ mb: 5, ...sx }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" gutterBottom>
              {heading}
            </Typography>
            <MBreadcrumbs links={links} {...other} />
          </Box>

          {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
        </Box>

        <Box sx={{ mt: 2 }}>
          {isString(moreLink) ? (
            <Link href={moreLink} target="_blank" variant="body2">
              {moreLink}
            </Link>
          ) : (
            moreLink.map((href) => (
              <Link
                noWrap
                key={href}
                href={href}
                variant="body2"
                target="_blank"
                sx={{ display: "table" }}
              >
                {href}
              </Link>
            ))
          )}
        </Box>
      </Box>
    );
}
