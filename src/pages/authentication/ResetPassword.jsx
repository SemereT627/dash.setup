import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import { styled } from "@material-ui/core/styles";
import { Box, Button, Card, Container, Typography } from "@material-ui/core";

import LogoOnlyLayout from "../../layouts/LogoOnlyLayout";

import { PATH_AUTH } from "../../routes/paths";

import Page from "../../components/Page";
import { ResetPasswordForm } from "../../components/authentication/reset-password";

import { SentIcon } from "../../assets";
import { MHidden } from "../../components/@material-extend";

const RootStyle = styled(Page)(({ theme }) => ({
  display: "flex",
  minHeight: "100%",
  alignItems: "center",
  justifyContent: "center",
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

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <RootStyle title="Reset Password | Fitness Gym Admin">
      <MHidden width="mdDown">
        <SectionStyle>
          <img src="/static/avatar/forgot-password.png" alt="login" />
        </SectionStyle>
      </MHidden>

      <Container>
        <Box sx={{ maxWidth: 480, mx: "auto" }}>
          {!sent ? (
            <>
              <Typography variant="h3" paragraph>
                Forgot your password?
              </Typography>
              <Typography
                sx={{
                  color: "text.secondary",
                  mb: 5,
                }}
              >
                Please enter the email address associated with your account and
                We will email you a link to reset your password.
              </Typography>

              <ResetPasswordForm
                onSent={() => setSent(true)}
                onGetEmail={(value) => setEmail(value)}
              />

              <Button
                fullWidth
                size="large"
                component={RouterLink}
                to={PATH_AUTH.login}
                sx={{ mt: 1 }}
              >
                Back
              </Button>
            </>
          ) : (
            <Box sx={{ textAlign: "center" }}>
              <SentIcon sx={{ mb: 5, mx: "auto", height: 160 }} />

              <Typography variant="h3" gutterBottom>
                Request sent successfully
              </Typography>
              <Typography>
                We have sent a confirmation email to &nbsp;
                <strong>{email}</strong>
                <br />
                Please check your email.
              </Typography>

              <Button
                size="large"
                variant="contained"
                component={RouterLink}
                to={PATH_AUTH.login}
                sx={{ mt: 5 }}
              >
                Back
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </RootStyle>
  );
}
