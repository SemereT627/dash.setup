import React, { useEffect } from "react";
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
import { MHidden, MIconButton } from "../../components/@material-extend";
import { LoginForm } from "../../components/authentication/login";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack5";
import { Icon } from "@iconify/react";
import closeFill from "@iconify/icons-eva/close-fill";
import {
  clearVerifyEmail,
  clearVerifyPhoneNumber,
} from "../../store/auth/authSlice";

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

export default function Login() {
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { phoneNumberVerificationSuccess, emailVerificationSuccess } =
    useSelector((state) => state.auth);

  useEffect(() => {
    if (phoneNumberVerificationSuccess) {
      enqueueSnackbar("Phone number verified successfully", {
        variant: "success",
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        ),
      });
      dispatch(clearVerifyPhoneNumber());
    }
    if (emailVerificationSuccess) {
      enqueueSnackbar("Email verified successfully", {
        variant: "success",
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        ),
      });
      dispatch(clearVerifyEmail());
    }
  }, [phoneNumberVerificationSuccess, emailVerificationSuccess]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <RootStyle title="Login | Fitness Gym Admin">
      <AuthLayout haveLogo={false}>
        Don’t have an account? &nbsp;
        <Link
          underline="none"
          variant="subtitle2"
          component={RouterLink}
          to={PATH_AUTH.register}
        >
          Get started
        </Link>
      </AuthLayout>

      <MHidden width="mdDown">
        <SectionStyle>
          <img src="/static/avatar/login.png" alt="login" />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom>
                Eshi Fitness Login
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                Login into your account.
              </Typography>
            </Box>

            <Tooltip title={"Fitness icon"}>
              <Box
                component="img"
                src={`/static/logo.png`}
                sx={{ width: 32, height: 32 }}
              />
            </Tooltip>
          </Stack>

          <LoginForm />

          <MHidden width="smUp">
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Don’t have an account?&nbsp;
              <Link
                variant="subtitle2"
                component={RouterLink}
                to={PATH_AUTH.register}
              >
                Get started
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
