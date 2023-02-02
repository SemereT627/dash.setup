import { alpha, styled } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";

import MyAvatar from "../../../MyAvatar";
import { useSelector } from "react-redux";

const RootStyle = styled("div")(({ theme }) => ({
  "&:before": {
    top: 0,
    zIndex: 9,
    width: "100%",
    content: "''",
    height: "100%",
    position: "absolute",
    backdropFilter: "blur(3px)",
    WebkitBackdropFilter: "blur(3px)", // Fix on Mobile
    backgroundColor: alpha(theme.palette.primary.darker, 0.72),
  },
}));

const InfoStyle = styled("div")(({ theme }) => ({
  left: 0,
  right: 0,
  zIndex: 99,
  position: "absolute",
  marginTop: theme.spacing(5),
  [theme.breakpoints.up("md")]: {
    right: "auto",
    display: "flex",
    alignItems: "center",
    left: theme.spacing(3),
    bottom: theme.spacing(3),
  },
}));

const CoverImgStyle = styled("img")({
  zIndex: 8,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

export default function ProfileCover() {
  const { user } = useSelector((state) => state.auth);

  return (
    <RootStyle>
      <InfoStyle>
        <MyAvatar
          sx={{
            mx: "auto",
            borderWidth: 2,
            borderStyle: "solid",
            borderColor: "common.white",
            width: { xs: 80, md: 128 },
            height: { xs: 80, md: 128 },
          }}
        />
        <Box
          sx={{
            ml: { md: 3 },
            mt: { xs: 1, md: 0 },
            color: "common.white",
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography variant="h4">{user.fullName}</Typography>
          <Typography sx={{ opacity: 0.72 }}>{user.role}</Typography>
        </Box>
      </InfoStyle>
      {/* <CoverImgStyle
        alt="profile cover"
        src={`${process.env.REACT_APP_IMG_URL}/users/${user.picture}`}
      /> */}
    </RootStyle>
  );
}
