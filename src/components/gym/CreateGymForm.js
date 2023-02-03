import { useSnackbar } from "notistack5";

import useIsMountedRef from "../../hooks/useIsMountedRef";

import { useDispatch, useSelector } from "react-redux";
import { changeGymState } from "../../store/auth/authSlice";
import { useNavigate } from "react-router-dom";

import "./style.css";
import {
  clearCreateFirstGym,
  clearCreateSecondGym,
  clearCreateThirdGym,
  createGymFirstStepperAsync,
  createGymSecondStepperAsync,
} from "../../store/gym/gymSlice";

import { fetchGymServicesAsync } from "../../store/service/serviceSlice";

import {
  CreateGymFormStepperOne,
  CreateGymFormStepperTwo,
  CreateGymFormStepperThree,
} from "./create-gym-form-steppers";
import { MIconButton } from "../@material-extend";
import { Icon } from "@iconify/react";
import closeFill from "@iconify/icons-eva/close-fill";
import { useEffect } from "react";

export default function CreateGymForm() {
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const {
    addressProfileCompleted,
    photoProfileCompleted,
    serviceProfileCompleted,
  } = useSelector((state) => state.auth);

  const {
    gymCreateFirstStepperSuccess,
    gymCreateSecondStepperSuccess,
    gymCreateThirdStepperSuccess,
  } = useSelector((state) => state.gym);

  useEffect(() => {
    dispatch(fetchGymServicesAsync({ status: "A" }));
    if (gymCreateFirstStepperSuccess) {
      enqueueSnackbar("Step 1 out of 3 success", {
        variant: "success",
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        ),
      });
      dispatch(changeGymState({ state: "addressProfileCompleted" }));
      dispatch(clearCreateFirstGym());
    }
    if (gymCreateSecondStepperSuccess) {
      enqueueSnackbar("Step 2 out of 3 success", {
        variant: "success",
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        ),
      });
      dispatch(changeGymState({ state: "photoProfileCompleted" }));
      dispatch(clearCreateSecondGym());
    }
    if (gymCreateThirdStepperSuccess) {
      enqueueSnackbar("Step 3 out of 3 success", {
        variant: "success",
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        ),
      });
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
      {!addressProfileCompleted ? (
        <CreateGymFormStepperOne />
      ) : !photoProfileCompleted ? (
        <CreateGymFormStepperTwo />
      ) : !serviceProfileCompleted ? (
        <CreateGymFormStepperThree />
      ) : null}
    </>
  );
}
