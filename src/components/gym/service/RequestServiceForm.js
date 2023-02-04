import { Alert, Stack, TextField, TextareaAutosize } from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";
import { Form, FormikProvider, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  clearCreateRequestService,
  createRequestServiceAsync,
} from "../../../store/service/serviceSlice";
import { useEffect } from "react";
import { useSnackbar } from "notistack5";
import { MIconButton } from "../../@material-extend";
import { Icon } from "@iconify/react";
import closeFill from "@iconify/icons-eva/close-fill";

export default function RequestServiceForm({
  onSuccessRequestService,
  onClose,
}) {
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const CreateGymSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
  });

  const { gymId } = useSelector((state) => state.auth);

  const {
    createRequestServiceLoading,
    createRequestServiceSuccess,
    createRequestServiceError,
  } = useSelector((state) => state.service);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: CreateGymSchema,
    onSubmit: (values) => {
      dispatch(createRequestServiceAsync({ gymId, values }));
    },
  });

  const { errors, touched, values, handleSubmit, isSubmitting, getFieldProps } =
    formik;

  useEffect(() => {
    if (createRequestServiceSuccess) {
      enqueueSnackbar("Request created successfully", {
        variant: "success",
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        ),
      });
      onSuccessRequestService([values]);
      onClose(false);
      dispatch(clearCreateRequestService());
    }
  }, [createRequestServiceSuccess]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Stack spacing={3}>
      {createRequestServiceError && (
        <Alert
          severity="error"
          onClose={() => dispatch(clearCreateRequestService())}
        >
          {createRequestServiceError}
        </Alert>
      )}
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Name"
              {...getFieldProps("name")}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
            />

            <TextField
              fullWidth
              multiline
              minRows={3}
              maxRows={5}
              label="Description"
              {...getFieldProps("description")}
              error={Boolean(touched.description && errors.description)}
              helperText={touched.description && errors.description}
            />

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={createRequestServiceLoading}
            >
              Submit
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
    </Stack>
  );
}
