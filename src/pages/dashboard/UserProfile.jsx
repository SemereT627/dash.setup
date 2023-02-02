import { Card, Container, Grid, Stack, Tab, Tabs } from "@material-ui/core";
import { Icon } from "@iconify/react";

import useSettings from "../../hooks/useSettings";
import Page from "../../components/Page";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import { useSelector } from "react-redux";
import { PATH_DASHBOARD } from "../../routes/paths";
import { ProfileCover } from "../../components/_dashboard/user/profile";
import { styled } from "@material-ui/core/styles";

import editAccount from "@iconify/icons-eva/edit-2-fill";
import roundAccountBox from "@iconify/icons-ic/round-account-box";
import { useState } from "react";
import { capitalCase } from "change-case";

const TabsWrapperStyle = styled("div")(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: "100%",
  display: "flex",
  position: "absolute",
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up("sm")]: {
    justifyContent: "center",
  },
  [theme.breakpoints.up("md")]: {
    justifyContent: "flex-end",
    paddingRight: theme.spacing(3),
  },
}));

export default function UserProfile() {
  const [currentTab, setCurrentTab] = useState("profile");

  const { user } = useSelector((state) => state.auth);
  const { themeStretch } = useSettings();

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const PROFILE_TABS = [
    {
      value: "profile",
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: <></>,
    },
    {
      value: "edit",
      icon: <Icon icon={editAccount} width={20} height={20} />,
      component: <></>,
    },
  ];

  return (
    <Page title="Profile | Fitness Gym Admin">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading="Profile"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "User", href: PATH_DASHBOARD.user.root },
            { name: user.fullName },
          ]}
        />
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: "relative",
          }}
        >
          <ProfileCover />

          <TabsWrapperStyle>
            <Tabs
              value={currentTab}
              scrollButtons="auto"
              variant="scrollable"
              allowScrollButtonsMobile
              onChange={handleChangeTab}
            >
              {PROFILE_TABS.map((tab) => (
                <Tab
                  disableRipple
                  key={tab.value}
                  value={tab.value}
                  icon={tab.icon}
                  label={capitalCase(tab.value)}
                />
              ))}
            </Tabs>
          </TabsWrapperStyle>
        </Card>
      </Container>
    </Page>
  );
}
