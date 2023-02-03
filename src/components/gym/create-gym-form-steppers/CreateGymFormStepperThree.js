import {
  Alert,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { clearCreateThirdGym } from "../../../store/gym/gymSlice";
import { useState } from "react";
import { LoadingComponent } from "../../loader";
import { LoadingButton } from "@material-ui/lab";
import { CustomModal } from "../../modal";
import RequestServiceForm from "../service/RequestServiceForm";

export default function CreateGymFormStepperThree() {
  const dispatch = useDispatch();
  const [selectedServices, setSelectedServices] = useState([]);
  const [showRequestServiceModal, setShowRequestServiceModal] = useState(false);

  const {
    gymCreateThirdStepperLoading,

    gymCreateThirdStepperError,
  } = useSelector((state) => state.gym);

  const { gymId } = useSelector((state) => state.auth);

  const { fetchGymServicesLoading, services } = useSelector(
    (state) => state.service
  );

  const handleServiceClick = (service) => {
    if (selectedServices.includes(service)) {
      const filteredItems = selectedServices.filter(
        (_service) => _service !== service
      );
      setSelectedServices(filteredItems);
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  return (
    <>
      <Stack spacing={3}>
        {gymCreateThirdStepperError && (
          <Alert
            severity="error"
            onClose={() => dispatch(clearCreateThirdGym())}
          >
            {gymCreateThirdStepperError}
          </Alert>
        )}

        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          justifyContent="start"
          spacing={2}
        >
          <Button
            sx={{ width: "40%", color: "primary.main" }}
            variant="text"
            onClick={() => setShowRequestServiceModal(true)}
          >
            Request Service
          </Button>
        </Stack>

        {fetchGymServicesLoading ? (
          <LoadingComponent visible={fetchGymServicesLoading} type={"dotted"} />
        ) : (
          <Grid container columns={3} gap={2}>
            {services.map((service, index) => (
              <Card
                key={service.id}
                sx={{
                  width: "33%",
                  border: selectedServices.includes(service.id)
                    ? "1px solid"
                    : "none",
                  borderColor: "primary.main",
                }}
                onClick={() => handleServiceClick(service.id)}
              >
                <CardMedia
                  component={"img"}
                  title={service.name}
                  height="120"
                  image={`${process.env.REACT_APP_IMG_URL}/services/${service.image}`}
                />
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{ textJustify: "center" }}
                    paragraph
                  >
                    {service.name}
                  </Typography>
                  <Typography>{service.description}</Typography>
                </CardContent>
              </Card>
            ))}
          </Grid>
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

      <CustomModal
        isOpen={showRequestServiceModal}
        onClose={() => setShowRequestServiceModal(false)}
        title="Create Request Service"
      >
        <RequestServiceForm />
      </CustomModal>
    </>
  );
}
