import { Container, Grid, Stack } from "@material-ui/core";

import useSettings from "../../hooks/useSettings";
import Page from "../../components/Page";

export default function GeneralApp() {
  const { themeStretch } = useSettings();

  return <Page title="Dashboard | Fitness Gym Admin">

  </Page>;
}
