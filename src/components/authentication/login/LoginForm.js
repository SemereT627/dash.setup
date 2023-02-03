import * as Yup from "yup";

import { useEffect, useState } from "react";
import { useSnackbar } from "notistack5";

import { Link as RouterLink } from "react-router-dom";

import { useFormik, Form, FormikProvider } from "formik";
import { Icon } from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import closeFill from "@iconify/icons-eva/close-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";

import {
  Link,
  Stack,
  Alert,
  TextField,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";

import { PATH_AUTH } from "../../../routes/paths";

import useIsMountedRef from "../../../hooks/useIsMountedRef";
import { MIconButton } from "../../@material-extend";

import { useDispatch, useSelector } from "react-redux";
import { clearLogin, loginAsync } from "../../../store/auth/authSlice";

export default function LoginForm() {
  const dispatch = useDispatch();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    phoneEmail: Yup.string().required("Phone number/Email address is required"),
    password: Yup.string().required("Password is required"),
  });

  const { loginLoading, loginSuccess, loginError } = useSelector(
    (state) => state.auth
  );

  const formik = useFormik({
    initialValues: {
      phoneEmail: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      try {
        dispatch(loginAsync(values));
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        console.error(error);
        resetForm();
        if (isMountedRef.current) {
          setSubmitting(false);
          setErrors({ afterSubmit: error.message });
        }
      }
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {loginError && (
            <Alert onClose={() => dispatch(clearLogin())} severity="error">
              {loginError}
            </Alert>
          )}

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Phone number/Email address"
            {...getFieldProps("phoneEmail")}
            error={Boolean(touched.phoneEmail && errors.phoneEmail)}
            helperText={touched.phoneEmail && errors.phoneEmail}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            label="Password"
            {...getFieldProps("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="end"
          sx={{ my: 2 }}
        >
          <Link
            component={RouterLink}
            variant="subtitle2"
            to={PATH_AUTH.resetPassword}
          >
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={loginLoading}
        >
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
