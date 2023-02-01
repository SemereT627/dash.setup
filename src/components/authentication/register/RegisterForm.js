import * as Yup from "yup";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useSnackbar } from "notistack5";
import { useFormik, Form, FormikProvider } from "formik";
import eyeFill from "@iconify/icons-eva/eye-fill";
import closeFill from "@iconify/icons-eva/close-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";

import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Alert,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";

import useIsMountedRef from "../../../hooks/useIsMountedRef";

import { MIconButton } from "../../@material-extend";
import { useDispatch, useSelector } from "react-redux";
import { clearRegister, registerAsync } from "../../../store/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { PATH_AUTH } from "../../../routes/paths";

import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { authentication } from "../../../firebase";

export default function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: () => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      authentication
    );
  };

  const RegisterSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Full name required"),
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    phone: Yup.string()
      .matches(
        /(0\s*9\s*(([0-9]\s*){8}))|(0\s*7\s*(([0-9]\s*){8}))/,
        "Phone number must be a valid phone number"
      )
      .length(10, "Phone number must be 10 digits")
      .required("Phone number is required"),

    gymName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Gym name is required"),

    password: Yup.string().required("Password is required"),
  });

  const { registerLoading, registerSuccess, registerError } = useSelector(
    (state) => state.auth
  );

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      gender: "F",
      gymName: "",
      password: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        dispatch(registerAsync({ ...values, phone: values.phone.slice(1) }));
        // enqueueSnackbar("Register success", {
        //   variant: "success",
        //   action: (key) => (
        //     <MIconButton size="small" onClick={() => closeSnackbar(key)}>
        //       <Icon icon={closeFill} />
        //     </MIconButton>
        //   ),
        // });
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        console.error(error);
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.message });
          setSubmitting(false);
        }
      }
    },
  });

  const { errors, touched, values, handleSubmit, isSubmitting, getFieldProps } =
    formik;

  useEffect(() => {
    if (registerSuccess) {
      dispatch(clearRegister());
      if (!isNaN(values.phone)) {
        generateRecaptcha();
        let appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(
          authentication,
          `+251${values.phone.slice(1)}`,
          appVerifier
        )
          .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            navigate(PATH_AUTH.verifyPhone, { replace: true });
          })
          .catch(() => {});
      }
    }
  }, [registerSuccess]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {registerError && (
              <Alert onClose={() => dispatch(clearRegister())} severity="error">
                {registerError}
              </Alert>
            )}

            <TextField
              fullWidth
              label="Full name"
              {...getFieldProps("fullName")}
              error={Boolean(touched.fullName && errors.fullName)}
              helperText={touched.fullName && errors.fullName}
            />

            <TextField
              fullWidth
              autoComplete="username"
              type="email"
              label="Email address"
              {...getFieldProps("email")}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />

            <TextField
              fullWidth
              label="Phone number"
              {...getFieldProps("phone")}
              error={Boolean(touched.phone && errors.phone)}
              helperText={touched.phone && errors.phone}
            />

            <Stack
              direction={{ xs: "row" }}
              style={{ alignItems: "center" }}
              spacing={2}
            >
              <TextField
                fullWidth
                label="Gym name"
                {...getFieldProps("gymName")}
                error={Boolean(touched.gymName && errors.gymName)}
                helperText={touched.gymName && errors.gymName}
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
                      <IconButton
                        edge="end"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
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
              direction={{ xs: "row" }}
              style={{ alignItems: "center" }}
              spacing={2}
            >
              <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="F"
                name="radio-buttons-group"
                style={{ display: "flex", flexDirection: "row" }}
                {...getFieldProps("gender")}
              >
                <FormControlLabel
                  value="F"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel value="M" control={<Radio />} label="Male" />
              </RadioGroup>
            </Stack>

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={registerLoading}
            >
              Register
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
      <div id="recaptcha-container"></div>
    </>
  );
}
