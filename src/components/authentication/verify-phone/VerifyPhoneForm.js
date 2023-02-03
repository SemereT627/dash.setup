import * as Yup from "yup";
import { Form, FormikProvider, useFormik } from "formik";

import { OutlinedInput, FormHelperText, Stack } from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";

import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack5";
import { PATH_AUTH } from "../../../routes/paths";
import { useDispatch, useSelector } from "react-redux";
import {
  verifyPhoneNumberAsync,
  verifyPhoneNumberError,
  verifyPhoneNumberStart,
  verifyPhoneNumberSuccess,
} from "../../../store/auth/authSlice";
import { useEffect } from "react";

function maxLength(object) {
  if (object.target.value.length > object.target.maxLength) {
    return (object.target.value = object.target.value.slice(
      0,
      object.target.maxLength
    ));
  }
}

export default function VerifyPhoneNumberForm({ onSent, onGetEmail }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const VerifyCodeSchema = Yup.object().shape({
    code1: Yup.number().required("Code is required"),
    code2: Yup.number().required("Code is required"),
    code3: Yup.number().required("Code is required"),
    code4: Yup.number().required("Code is required"),
    code5: Yup.number().required("Code is required"),
    code6: Yup.number().required("Code is required"),
  });

  const {
    phoneNumberVerificationLoading,
    phoneNumberVerificationSuccess,
    phoneNumberVerificationError,
    phoneNumberVerificationToken,
  } = useSelector((state) => state.auth);

  const verifyOTP = (value) => {
    dispatch(verifyPhoneNumberStart());
    let confirmationResult = window.confirmationResult;
    confirmationResult
      .confirm(value)
      .then(() => {
        dispatch(verifyPhoneNumberSuccess());
      })
      .catch((error) => {
        dispatch(verifyPhoneNumberError(error));
      });
  };

  const formik = useFormik({
    initialValues: {
      code1: "",
      code2: "",
      code3: "",
      code4: "",
      code5: "",
      code6: "",
    },
    validationSchema: VerifyCodeSchema,
    onSubmit: async (values) => {
      const verificationCode = Object.values(values).join("");
      verifyOTP(verificationCode);
    },
  });

  const {
    values,
    errors,
    isValid,
    touched,
    isSubmitting,
    handleSubmit,
    getFieldProps,
  } = formik;

  useEffect(() => {
    if (phoneNumberVerificationSuccess) {
      dispatch(
        verifyPhoneNumberAsync({
          verificationToken: phoneNumberVerificationToken,
        })
      );
      navigate(PATH_AUTH.login);
    }
  }, [phoneNumberVerificationSuccess]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack direction="row" spacing={2} justifyContent="center">
          {Object.keys(values).map((item) => (
            <OutlinedInput
              key={item}
              {...getFieldProps(item)}
              type="number"
              placeholder="-"
              onInput={maxLength}
              error={Boolean(touched[item] && errors[item])}
              inputProps={{
                maxLength: 1,
                sx: {
                  p: 0,
                  textAlign: "center",
                  width: { xs: 36, sm: 56 },
                  height: { xs: 36, sm: 56 },
                },
              }}
            />
          ))}
        </Stack>

        <FormHelperText error={!isValid} style={{ textAlign: "right" }}>
          {!isValid && "Code is required"}
        </FormHelperText>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={phoneNumberVerificationLoading}
          sx={{ mt: 3 }}
        >
          Verify
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
