import React from "react";
import { capitalCase } from "change-case";
import { Link as RouterLink } from "react-router-dom";

import { styled } from "@material-ui/core/styles";
import {
  Box,
  Card,
  Stack,
  Link,
  Alert,
  Tooltip,
  Container,
  Typography,
  Button,
} from "@material-ui/core";

import { PATH_AUTH } from "../../routes/paths";

import AuthLayout from "../../layouts/AuthLayout";

import Page from "../../components/Page";
import { MHidden } from "../../components/@material-extend";
import { VerifyPhoneForm } from "../../components/authentication/verify-phone";
import { Icon } from "@iconify/react";
import arrowIosBackFill from "@iconify/icons-eva/arrow-ios-back-fill";

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  height: "96vh",
  overflow: "hidden",
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

export default function VerifyPhone() {
  return (
    <RootStyle title="Verify Phone | Fitness Gym Admin">
      <MHidden width="mdDown">
        <SectionStyle>
          <img src="/static/avatar/verify-phone.png" alt="login" />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Box sx={{ maxWidth: 480, mx: "auto" }}>
            <Button
              size="small"
              component={RouterLink}
              to={PATH_AUTH.login}
              startIcon={
                <Icon icon={arrowIosBackFill} width={20} height={20} />
              }
              sx={{ mb: 3 }}
            >
              Back
            </Button>

            <Typography variant="h4" paragraph>
              Eshi Fitness Verify Phone Number
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              We have texted a 6-digit confirmation code to phone number, please
              enter the code in below box to verify your phone number.
            </Typography>

            <Box sx={{ mt: 5, mb: 3 }}>
              <VerifyPhoneForm />
            </Box>

            <Typography variant="body2" align="center">
              Don’t have a code? &nbsp;
              <Link variant="subtitle2" underline="none" onClick={() => {}}>
                Resend code
              </Link>
            </Typography>
          </Box>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
