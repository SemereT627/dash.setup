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
import {
  clearCreateThirdGym,
  createGymThirdStepperAsync,
} from "../../../store/gym/gymSlice";
import { useState } from "react";
import { LoadingComponent } from "../../loader";
import { LoadingButton } from "@material-ui/lab";
import { CustomModal } from "../../modal";
import RequestServiceForm from "../service/RequestServiceForm";

import "../style.css";

export default function CreateGymFormStepperThree() {
  const dispatch = useDispatch();
  const [selectedServices, setSelectedServices] = useState([]);
  const [requestedServices, setRequestedServices] = useState([]);
  const [showRequestServiceModal, setShowRequestServiceModal] = useState(false);

  const { gymCreateThirdStepperLoading, gymCreateThirdStepperError } =
    useSelector((state) => state.gym);

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

  const handleFormThreeSubmit = () => {
    if (selectedServices.length === 0) {
      alert("Please select at least one service");
    }
    dispatch(
      createGymThirdStepperAsync({ gymId, serviceId: selectedServices })
    );
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
          justifyContent="space-between"
          spacing={2}
        >
          <Button
            sx={{ width: "40%", color: "primary.main" }}
            variant="text"
            onClick={() => setShowRequestServiceModal(true)}
          >
            Request Service
          </Button>

          <Typography variant="body2" sx={{ textAlign: "center" }}>
            {`Selected ${selectedServices.length} services`}
          </Typography>
        </Stack>

        {fetchGymServicesLoading ? (
          <LoadingComponent visible={fetchGymServicesLoading} type={"dotted"} />
        ) : (
          <>
            <div
              style={{
                display: "flex",
                flexWrap: "nowrap",
                overflowX: "auto",
                padding: "10px",
              }}
              className="fitness-scrollbar"
            >
              {services.map((service, index) => (
                <Card
                  key={service.id}
                  sx={{
                    flex: "0 0 auto",
                    display: "inline-block",
                    marginRight: "10px",
                    marginBottom: "10px",
                    border: selectedServices.includes(service.id)
                      ? "1px solid"
                      : "none",
                    borderColor: "primary.main",
                    width: "180px",
                  }}
                  onClick={() => handleServiceClick(service.id)}
                >
                  <CardMedia
                    component={"img"}
                    title={service.name}
                    height="140"
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
            </div>

            <div>
              <Typography variant="h5">Requested Services</Typography>

              <Stack direction="row" spacing={2}>
                {requestedServices.length > 0
                  ? requestedServices.map((service, index) => (
                      <div
                        key={index}
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          margin: "5px",
                          padding: "5px",
                          boxShadow: "0px 0px 5px 0px rgba(4,0,0,0.45)",
                          borderRadius: "5px",
                        }}
                      >
                        <Typography>{service.name}</Typography>
                        <Typography>{service.description}</Typography>
                      </div>
                    ))
                  : null}
              </Stack>
            </div>
          </>
        )}

        <LoadingButton
          fullWidth
          size="large"
          type="button"
          variant="contained"
          onClick={handleFormThreeSubmit}
          loading={gymCreateThirdStepperLoading}
        >
          Submit
        </LoadingButton>
      </Stack>

      <CustomModal
        isOpen={showRequestServiceModal}
        onClose={() => setShowRequestServiceModal(false)}
        title="New Request Service"
      >
        <RequestServiceForm
          onSuccessRequestService={setRequestedServices}
          onClose={setShowRequestServiceModal}
        />
      </CustomModal>
    </>
  );
}
