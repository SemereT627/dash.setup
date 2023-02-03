import { Stack, TextField, TextareaAutosize } from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";

export default function RequestServiceForm() {
  const CreateGymSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: CreateGymSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const { errors, touched, values, handleSubmit, isSubmitting, getFieldProps } =
    formik;

  return (
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
            loading={isSubmitting}
          >
            Submit
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
