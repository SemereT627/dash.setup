import {
  Box,
  Card,
  Container,
  Grid,
  Stack,
  Tooltip,
  Typography,
} from "@material-ui/core";

import useSettings from "../../hooks/useSettings";
import Page from "../../components/Page";
import { CreateGymForm } from "../../components/gym";
import { MHidden } from "../../components/@material-extend";

import { styled } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 654,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

export default function GeneralApp() {
  const { themeStretch } = useSettings();

  const { addressProfileCompleted, photoProfileCompleted } = useSelector(
    (state) => state.auth
  );

  const CREATE_GYM_STEPS = [
    "Gym Location and Working Days",
    "Gym Profile Photo",
    "Gym Services",
  ];

  return (
    <RootStyle title="Create Gym | Fitness Gym Admin">
      <MHidden width="mdDown">
        <SectionStyle>
          <img
            src={`/static/avatar/create-gym-${
              addressProfileCompleted ? 2 : photoProfileCompleted ? 3 : 1
            }.png`}
            alt="login"
          />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom>
                Eshi Fitness Create Gym
              </Typography>
              <Stack
                direction="row"
                justifyContent={"space-between"}
                alignItems="center"
              >
                <Typography sx={{ color: "text.secondary" }}>
                  {
                    CREATE_GYM_STEPS[
                      addressProfileCompleted
                        ? 1
                        : photoProfileCompleted
                        ? 2
                        : 0
                    ]
                  }
                </Typography>
                <Typography sx={{ color: "text.primary" }}>
                  Step
                  {` ${
                    addressProfileCompleted ? 2 : photoProfileCompleted ? 3 : 1
                  } `}
                  of 3
                </Typography>
              </Stack>
            </Box>

            <Tooltip title={"Fitness icon"}>
              <Box
                component="img"
                src={`/static/logo.png`}
                sx={{ width: 32, height: 32 }}
              />
            </Tooltip>
          </Stack>

          <CreateGymForm />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
