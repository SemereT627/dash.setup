import * as Yup from "yup";
import { useCallback, useEffect, useState } from "react";
import { useSnackbar } from "notistack5";
import { useFormik, Form, FormikProvider } from "formik";

import {
  Stack,
  TextField,
  Alert,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Checkbox,
  Card,
  CardHeader,
  CardContent,
} from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";

import useIsMountedRef from "../../hooks/useIsMountedRef";

import { useDispatch, useSelector } from "react-redux";
import { changeGymState } from "../../store/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { PATH_AUTH } from "../../routes/paths";
import { usePlacesWidget } from "react-google-autocomplete";

import { styled } from "@material-ui/core/styles";
import "./style.css";
import {
  clearCreateFirstGym,
  clearCreateSecondGym,
  clearCreateThirdGym,
  createGymFirstStepperAsync,
  createGymSecondStepperAsync,
} from "../../store/gym/gymSlice";
import UploadSingleFile from "../upload/UploadSingleFile";
import { UploadMultiFile } from "../upload";

export default function CreateGymForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);

  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

  const [location, setLocation] = useState({
    latitude: 0,
    longtiude: 0,
  });

  const { ref } = usePlacesWidget({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
    onPlaceSelected: (place) =>
      setLocation({
        latitude: place.geometry.location.lat(),
        longtiude: place.geometry.location.lng(),
      }),
    options: {
      types: ["(cities)"],
      componentRestrictions: { country: "et" },
    },
  });

  const {
    addressProfileCompleted,
    photoProfileCompleted,
    serviceProfileCompleted,
    gymId,
  } = useSelector((state) => state.auth);

  const {
    gymCreateFirstStepperLoading,
    gymCreateFirstStepperSuccess,
    gymCreateFirstStepperError,

    gymCreateSecondStepperLoading,
    gymCreateSecondStepperSuccess,
    gymCreateSecondStepperError,

    gymCreateThirdStepperLoading,
    gymCreateThirdStepperSuccess,
    gymCreateThirdStepperError,
  } = useSelector((state) => state.gym);

  const CreateGymSchema = Yup.object().shape({
    city: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("City is required"),
    subcity: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Subcity is required"),
    woreda: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(1, "Too Short!")
      .max(2, "Too Long!")
      .required("Woreda is required"),
    latLng: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Gym name is required"),
  });

  const formik = useFormik({
    initialValues: {
      city: "",
      subcity: "",
      woreda: "",
      latLng: "",
    },
    validationSchema: CreateGymSchema,
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

  const ContentStyle = styled("div")(({ theme }) => ({
    paddingTop: "50px",
    paddingRight: "10px",
    maxHeight: "27vh",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    overflowY: "scroll",
    scrollbarWidth: "thin",
    scrollbarColor: "#9e9e9e transparent",
  }));

  const ProfileStyle = styled("div")(({ theme }) => ({
    paddingTop: "140px",
    paddingRight: "10px",
    maxHeight: "50vh",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    overflowY: "scroll",
    scrollbarWidth: "thin",
    scrollbarColor: "#9e9e9e transparent",
  }));

  const { errors, touched, values, handleSubmit, isSubmitting, getFieldProps } =
    formik;

  const [chooseDate, setChooseDate] = useState({
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: true,
    sunday: true,
  });

  const [chooseTime, setChooseTime] = useState({
    monday: {
      fullDay: true,
      halfDay: false,
    },
    tuesday: {
      fullDay: true,
      halfDay: false,
    },
    wednesday: {
      fullDay: true,
      halfDay: false,
    },
    thursday: {
      fullDay: true,
      halfDay: false,
    },
    friday: {
      fullDay: true,
      halfDay: false,
    },
    saturday: {
      fullDay: true,
      halfDay: false,
    },
    sunday: {
      fullDay: true,
      halfDay: false,
    },
  });

  const handleDropSingleFile = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setFile({
        ...file,
        preview: URL.createObjectURL(file),
      });
    }
  }, []);

  const handleDropMultiFile = useCallback(
    (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [setFiles]
  );

  const handleRemoveAll = () => {
    setFiles([]);
  };

  const handleRemove = (file) => {
    const filteredItems = files.filter((_file) => _file !== file);
    setFiles(filteredItems);
  };

  const handleFormOneSubmit = () => {
    const activeSelectedDays = Object.keys(chooseDate).filter(
      (key) => chooseDate[key] === true
    );
    const inactiveDays = Object.keys(chooseDate).filter(
      (key) => chooseDate[key] === false
    );
    let totalSelectedDays = {};
    for (let i = 0; i < activeSelectedDays.length; i++) {
      const key = activeSelectedDays[i];
      if (key in chooseTime) {
        if (chooseTime[key].fullDay) {
          totalSelectedDays[key] = "Full day";
        }
        if (chooseTime[key].halfDay) {
          totalSelectedDays[key] = "Half day";
        }
      }
    }
    for (let i = 0; i < inactiveDays.length; i++) {
      const key = inactiveDays[i];
      totalSelectedDays[key] = "Off";
    }

    const result = {
      address: {
        city: values.city,
        subcity: values.subcity,
        woreda: values.woreda,
        latitude: location.latitude,
        longtiude: location.longtiude,
      },
      workingDays: totalSelectedDays,
    };
    dispatch(createGymFirstStepperAsync({ gymId, result }));
  };

  const handleFormTwoSubmit = () => {
    if (files.length === 0) {
      alert("Please upload at least one photo");
      return;
    }
    if (file === null) {
      alert("Please upload a cover photo");
      return;
    }

    const formData = new FormData();
    formData.append("logo", file);
    files.map((image) => {
      formData.append("newPhotos", image);
    });

    dispatch(createGymSecondStepperAsync({ gymId, result: formData }));
  };

  useEffect(() => {
    if (gymCreateFirstStepperSuccess) {
      dispatch(changeGymState({ state: "addressProfileCompleted" }));
      dispatch(clearCreateFirstGym());
    }
    if (gymCreateSecondStepperSuccess) {
      dispatch(changeGymState({ state: "photoProfileCompleted" }));
      dispatch(clearCreateSecondGym());
    }
    if (gymCreateThirdStepperSuccess) {
      dispatch(changeGymState({ state: "serviceProfileCompleted" }));
      dispatch(clearCreateThirdGym());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    gymCreateFirstStepperSuccess,
    gymCreateSecondStepperSuccess,
    gymCreateThirdStepperSuccess,
  ]);

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          {!addressProfileCompleted ? (
            <Stack spacing={3}>
              {gymCreateFirstStepperError && (
                <Alert
                  severity="error"
                  onClose={() => dispatch(clearCreateFirstGym())}
                >
                  {gymCreateFirstStepperError}
                </Alert>
              )}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
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
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  fullWidth
                  label="Woreda"
                  {...getFieldProps("woreda")}
                  error={Boolean(touched.woreda && errors.woreda)}
                  helperText={touched.woreda && errors.woreda}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      lineHeight: "1.4375em",
                      fontSize: "1rem",
                      fontFamily: "Poppins,sans-serif",
                      fontWeight: 400,
                      color: "#C6BB89",
                      boxSizing: "border-box",
                      position: "relative",
                      cursor: "text",
                      alignItems: "center",
                      width: "100%",
                      border: "1px solid #E4E7EB",
                      padding: "10px 14px",
                      borderRadius: "8px",
                    }}
                  >
                    <input
                      ref={ref}
                      required
                      style={{
                        font: "inherit",
                        letterSpacing: "inherit",
                        padding: "6px 0 5px",
                        border: "0",
                        boxSizing: "content-box",
                        background: "none",
                        height: "1.4375em",
                        margin: "0",
                        display: "block",
                        minWidth: "0",
                        width: "100%",
                        outline: "none",
                      }}
                    />
                  </div>
                </div>
              </Stack>
              <Typography variant="h5" gutterBottom>
                Working Days
              </Typography>

              <ContentStyle className="fitness-scrollbar">
                {/* Monday */}
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <FormControlLabel
                    value="monday"
                    control={
                      <Checkbox
                        onClick={() =>
                          setChooseDate({
                            ...chooseDate,
                            monday: !chooseDate.monday,
                          })
                        }
                        checked={chooseDate.monday}
                      />
                    }
                    label="Monday"
                    labelPlacement="end"
                  />

                  <RadioGroup
                    aria-label="monday"
                    name="monday"
                    defaultValue="fullDay"
                    onChange={(e) => {
                      setChooseTime({
                        ...chooseTime,
                        monday: {
                          fullDay: e.target.value === "fullDay" ? true : false,
                          halfDay: e.target.value === "halfDay" ? true : false,
                        },
                      });
                    }}
                  >
                    <Stack
                      direction={{ xs: "row" }}
                      alignItems="center"
                      justifyContent="space-between"
                      spacing={2}
                    >
                      <FormControlLabel
                        value="halfDay"
                        control={
                          <Radio
                            checked={chooseTime.monday.halfDay}
                            color="primary"
                            disabled={!chooseDate.monday}
                          />
                        }
                        label="Half day"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="fullDay"
                        control={
                          <Radio
                            checked={chooseTime.monday.fullDay}
                            color="primary"
                            disabled={!chooseDate.monday}
                          />
                        }
                        label="Full day"
                        labelPlacement="end"
                      />
                    </Stack>
                  </RadioGroup>
                </Stack>
                {/* Tuesday */}
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  alignItems="center"
                  justifyContent="space-between"
                  spacing={2}
                >
                  <FormControlLabel
                    value="tuesday"
                    control={
                      <Checkbox
                        onClick={() =>
                          setChooseDate({
                            ...chooseDate,
                            tuesday: !chooseDate.tuesday,
                          })
                        }
                        checked={chooseDate.tuesday}
                      />
                    }
                    label="Tuesday"
                    labelPlacement="end"
                  />

                  <RadioGroup
                    aria-label="tuesday"
                    name="tuesday"
                    defaultValue="fullDay"
                    onChange={(e) =>
                      setChooseTime({
                        ...chooseTime,
                        tuesday: {
                          fullDay: e.target.value === "fullDay" ? true : false,
                          halfDay: e.target.value === "halfDay" ? true : false,
                        },
                      })
                    }
                  >
                    <Stack
                      direction={{ xs: "row" }}
                      alignItems="center"
                      justifyContent="space-between"
                      spacing={2}
                    >
                      <FormControlLabel
                        value="halfDay"
                        control={
                          <Radio
                            checked={chooseTime.tuesday.halfDay}
                            color="primary"
                            disabled={!chooseDate.tuesday}
                          />
                        }
                        label="Half day"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="fullDay"
                        control={
                          <Radio
                            checked={chooseTime.tuesday.fullDay}
                            color="primary"
                            disabled={!chooseDate.tuesday}
                          />
                        }
                        label="Full day"
                        labelPlacement="end"
                      />
                    </Stack>
                  </RadioGroup>
                </Stack>
                {/* Wednesday */}
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  alignItems="center"
                  justifyContent="space-between"
                  spacing={2}
                >
                  <FormControlLabel
                    value="wednesday"
                    control={
                      <Checkbox
                        onClick={() =>
                          setChooseDate({
                            ...chooseDate,
                            wednesday: !chooseDate.wednesday,
                          })
                        }
                        checked={chooseDate.wednesday}
                      />
                    }
                    label="Wednesday"
                    labelPlacement="end"
                  />

                  <RadioGroup
                    aria-label="wednesday"
                    name="wednesday"
                    defaultValue="fullDay"
                    onChange={(e) =>
                      setChooseTime({
                        ...chooseTime,
                        wednesday: {
                          fullDay: e.target.value === "fullDay" ? true : false,
                          halfDay: e.target.value === "halfDay" ? true : false,
                        },
                      })
                    }
                  >
                    <Stack
                      direction={{ xs: "row" }}
                      alignItems="center"
                      justifyContent="space-between"
                      spacing={2}
                    >
                      <FormControlLabel
                        value="halfDay"
                        control={
                          <Radio
                            checked={chooseTime.wednesday.halfDay}
                            color="primary"
                            disabled={!chooseDate.wednesday}
                          />
                        }
                        label="Half day"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="fullDay"
                        control={
                          <Radio
                            checked={chooseTime.wednesday.fullDay}
                            color="primary"
                            disabled={!chooseDate.wednesday}
                          />
                        }
                        label="Full day"
                        labelPlacement="end"
                      />
                    </Stack>
                  </RadioGroup>
                </Stack>
                {/* Thursday */}
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  alignItems="center"
                  justifyContent="space-between"
                  spacing={2}
                >
                  <FormControlLabel
                    value="thursday"
                    control={
                      <Checkbox
                        onClick={() =>
                          setChooseDate({
                            ...chooseDate,
                            thursday: !chooseDate.thursday,
                          })
                        }
                        checked={chooseDate.thursday}
                      />
                    }
                    label="Thursday"
                    labelPlacement="end"
                  />

                  <RadioGroup
                    aria-label="thursday"
                    name="thursday"
                    defaultValue="fullDay"
                    onChange={(e) =>
                      setChooseTime({
                        ...chooseTime,
                        thursday: {
                          fullDay: e.target.value === "fullDay" ? true : false,
                          halfDay: e.target.value === "halfDay" ? true : false,
                        },
                      })
                    }
                  >
                    <Stack
                      direction={{ xs: "row" }}
                      alignItems="center"
                      justifyContent="space-between"
                      spacing={2}
                    >
                      <FormControlLabel
                        value="halfDay"
                        control={
                          <Radio
                            checked={chooseTime.thursday.halfDay}
                            color="primary"
                            disabled={!chooseDate.thursday}
                          />
                        }
                        label="Half day"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="fullDay"
                        control={
                          <Radio
                            checked={chooseTime.thursday.fullDay}
                            color="primary"
                            disabled={!chooseDate.thursday}
                          />
                        }
                        label="Full day"
                        labelPlacement="end"
                      />
                    </Stack>
                  </RadioGroup>
                </Stack>
                {/* Friday */}
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  alignItems="center"
                  justifyContent="space-between"
                  spacing={2}
                >
                  <FormControlLabel
                    value="friday"
                    control={
                      <Checkbox
                        onClick={() =>
                          setChooseDate({
                            ...chooseDate,
                            friday: !chooseDate.friday,
                          })
                        }
                        checked={chooseDate.friday}
                      />
                    }
                    label="Friday"
                    labelPlacement="end"
                  />

                  <RadioGroup
                    aria-label="friday"
                    name="friday"
                    defaultValue="fullDay"
                    onChange={(e) =>
                      setChooseTime({
                        ...chooseTime,
                        friday: {
                          fullDay: e.target.value === "fullDay" ? true : false,
                          halfDay: e.target.value === "halfDay" ? true : false,
                        },
                      })
                    }
                  >
                    <Stack
                      direction={{ xs: "row" }}
                      alignItems="center"
                      justifyContent="space-between"
                      spacing={2}
                    >
                      <FormControlLabel
                        value="halfDay"
                        control={
                          <Radio
                            checked={chooseTime.friday.halfDay}
                            color="primary"
                            disabled={!chooseDate.friday}
                          />
                        }
                        label="Half day"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="fullDay"
                        control={
                          <Radio
                            checked={chooseTime.friday.fullDay}
                            color="primary"
                            disabled={!chooseDate.friday}
                          />
                        }
                        label="Full day"
                        labelPlacement="end"
                      />
                    </Stack>
                  </RadioGroup>
                </Stack>
                {/* Saturday */}
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  alignItems="center"
                  justifyContent="space-between"
                  spacing={2}
                >
                  <FormControlLabel
                    value="saturday"
                    control={
                      <Checkbox
                        onClick={() =>
                          setChooseDate({
                            ...chooseDate,
                            saturday: !chooseDate.saturday,
                          })
                        }
                        checked={chooseDate.saturday}
                      />
                    }
                    label="Saturday"
                    labelPlacement="end"
                  />

                  <RadioGroup
                    aria-label="saturday"
                    name="saturday"
                    defaultValue="fullDay"
                    onChange={(e) =>
                      setChooseTime({
                        ...chooseTime,
                        saturday: {
                          fullDay: e.target.value === "fullDay" ? true : false,
                          halfDay: e.target.value === "halfDay" ? true : false,
                        },
                      })
                    }
                  >
                    <Stack
                      direction={{ xs: "row" }}
                      alignItems="center"
                      justifyContent="space-between"
                      spacing={2}
                    >
                      <FormControlLabel
                        value="halfDay"
                        control={
                          <Radio
                            checked={chooseTime.saturday.halfDay}
                            color="primary"
                            disabled={!chooseDate.saturday}
                          />
                        }
                        label="Half day"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="fullDay"
                        control={
                          <Radio
                            checked={chooseTime.saturday.fullDay}
                            color="primary"
                            disabled={!chooseDate.saturday}
                          />
                        }
                        label="Full day"
                        labelPlacement="end"
                      />
                    </Stack>
                  </RadioGroup>
                </Stack>
                {/* Sunday */}
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  alignItems="center"
                  justifyContent="space-between"
                  spacing={2}
                >
                  <FormControlLabel
                    value="sunday"
                    control={
                      <Checkbox
                        onClick={() =>
                          setChooseDate({
                            ...chooseDate,
                            sunday: !chooseDate.sunday,
                          })
                        }
                        checked={chooseDate.sunday}
                      />
                    }
                    label="Sunday"
                    labelPlacement="end"
                  />

                  <RadioGroup
                    aria-label="sunday"
                    name="sunday"
                    defaultValue="fullDay"
                    onChange={(e) =>
                      setChooseTime({
                        ...chooseTime,
                        sunday: {
                          fullDay: e.target.value === "fullDay" ? true : false,
                          halfDay: e.target.value === "halfDay" ? true : false,
                        },
                      })
                    }
                  >
                    <Stack
                      direction={{ xs: "row" }}
                      alignItems="center"
                      justifyContent="space-between"
                      spacing={2}
                    >
                      <FormControlLabel
                        value="halfDay"
                        control={
                          <Radio
                            checked={chooseTime.sunday.halfDay}
                            color="primary"
                            disabled={!chooseDate.sunday}
                          />
                        }
                        label="Half day"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="fullDay"
                        control={
                          <Radio
                            checked={chooseTime.sunday.fullDay}
                            color="primary"
                            disabled={!chooseDate.sunday}
                          />
                        }
                        label="Full day"
                        labelPlacement="end"
                      />
                    </Stack>
                  </RadioGroup>
                </Stack>
              </ContentStyle>

              <LoadingButton
                fullWidth
                size="large"
                type="button"
                variant="contained"
                loading={gymCreateFirstStepperLoading}
                onClick={handleFormOneSubmit}
              >
                Next
              </LoadingButton>
            </Stack>
          ) : !photoProfileCompleted ? (
            <Stack spacing={3}>
              {gymCreateSecondStepperError && (
                <Alert
                  severity="error"
                  onClose={() => dispatch(clearCreateSecondGym())}
                >
                  {gymCreateSecondStepperError}
                </Alert>
              )}

              <ProfileStyle className="fitness-scrollbar">
                <Typography variant="h5" gutterBottom>
                  Gym Logo
                </Typography>
                <UploadSingleFile file={file} onDrop={handleDropSingleFile} />
                <Typography
                  variant="h5"
                  sx={{ paddingTop: "15px" }}
                  gutterBottom
                >
                  Gym Photos
                </Typography>
                <UploadMultiFile
                  showPreview={true}
                  files={files}
                  onDrop={handleDropMultiFile}
                  onRemove={handleRemove}
                  onRemoveAll={handleRemoveAll}
                />
              </ProfileStyle>

              <LoadingButton
                fullWidth
                size="large"
                type="button"
                variant="contained"
                onClick={handleFormTwoSubmit}
                loading={gymCreateSecondStepperLoading}
              >
                Next
              </LoadingButton>
            </Stack>
          ) : !serviceProfileCompleted ? (
            <Stack spacing={3}>
              {gymCreateThirdStepperError && (
                <Alert
                  severity="error"
                  onClose={() => dispatch(clearCreateThirdGym())}
                >
                  {gymCreateThirdStepperError}
                </Alert>
              )}
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={gymCreateThirdStepperLoading}
              >
                Submit
              </LoadingButton>
            </Stack>
          ) : null}
        </Form>
      </FormikProvider>
      <div id="recaptcha-container"></div>
    </>
  );
}
