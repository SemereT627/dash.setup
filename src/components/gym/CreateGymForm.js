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

import useIsMountedRef from "../../hooks/useIsMountedRef";

import { MIconButton } from "../@material-extend";
import { useDispatch, useSelector } from "react-redux";
import { clearRegister, registerAsync } from "../../store/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { PATH_AUTH } from "../../routes/paths";

export default function CreateGymForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    city: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("City is required"),
    subcity: Yup.string()
      .email("Email must be a valid email address")
      .required("Subcity is required"),
    woreda: Yup.number()
      .min(1, "Too Short!")
      .max(2, "Too Long!")
      .required("Woreda is required"),
    latLng: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Gym name is required"),
  });

  const { registerLoading, registerSuccess, registerError } = useSelector(
    (state) => state.auth
  );

  const formik = useFormik({
    initialValues: {
      city: "",
      subcity: "",
      woreda: "",
      latLng: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
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

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {registerError && <Alert severity="error">{registerError}</Alert>}

            <TextField
              fullWidth
              label="City"
              {...getFieldProps("city")}
              error={Boolean(touched.city && errors.city)}
              helperText={touched.city && errors.city}
            />

            <TextField
              fullWidth
              autoComplete="username"
              label="Subcity"
              {...getFieldProps("subcity")}
              error={Boolean(touched.subcity && errors.subcity)}
              helperText={touched.subcity && errors.subcity}
            />

            <TextField
              fullWidth
              label="Woreda"
              {...getFieldProps("woreda")}
              error={Boolean(touched.woreda && errors.woreda)}
              helperText={touched.woreda && errors.woreda}
            />

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={registerLoading}
            >
              Next
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
      <div id="recaptcha-container"></div>
    </>
  );
}
