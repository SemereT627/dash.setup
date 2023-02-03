import { Container, Grid, Stack } from "@material-ui/core";

import useSettings from "../../hooks/useSettings";
import Page from "../../components/Page";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack5";

import closeFill from "@iconify/icons-eva/close-fill";
import { MIconButton } from "../../components/@material-extend";
import { Icon } from "@iconify/react";
import { useEffect } from "react";
import { clearLogin } from "../../store/auth/authSlice";

export default function GeneralApp() {
  const dispatch = useDispatch();
  const { themeStretch } = useSettings();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { loginSuccess } = useSelector((state) => state.auth);

  useEffect(() => {
    if (loginSuccess) {
      enqueueSnackbar("Login success", {
        variant: "success",
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        ),
      });
      dispatch(clearLogin());
    }
  }, [loginSuccess]); // eslint-disable-line react-hooks/exhaustive-deps

  return <Page title="Dashboard | Fitness Gym Admin"></Page>;
}
