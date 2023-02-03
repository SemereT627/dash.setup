import React, { useEffect } from "react";
import {
  Link as RouterLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { styled } from "@material-ui/core/styles";
import {
  Box,
  Card,
  Stack,
  Link,
  Tooltip,
  Container,
  Typography,
} from "@material-ui/core";

import { PATH_AUTH } from "../../routes/paths";

import Page from "../../components/Page";
import { MHidden } from "../../components/@material-extend";
import { LoadingComponent } from "../../components/loader";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmailAsync } from "../../store/auth/authSlice";

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  height: "96vh",
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

export default function VerifyEmail() {
  const dispatch = useDispatch();
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const {
    emailVerificationLoading,
    emailVerificationSuccess,
    emailVerificationError,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    if (params.get("verificationToken")) {
      dispatch(
        verifyEmailAsync({ verificationToken: params.get("verificationToken") })
      );
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (emailVerificationSuccess) {
      navigate("/auth/login", { replace: true });
    }
  }, [emailVerificationSuccess]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <RootStyle title="Verify Email | Fitness Gym Admin">
      <MHidden width="mdDown">
        <SectionStyle>
          <img src="/static/avatar/verify-email.png" alt="verify-email" />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom>
                Eshi Fitness Verify Email
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                Verifying your email, please be patient.
              </Typography>
            </Box>
            <LoadingComponent
              visible={emailVerificationLoading}
              type={"dotted"}
            />

            <Tooltip title={"Fitness icon"}>
              <Box
                component="img"
                src={`/static/logo.png`}
                sx={{ width: 32, height: 32 }}
              />
            </Tooltip>
          </Stack>

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
