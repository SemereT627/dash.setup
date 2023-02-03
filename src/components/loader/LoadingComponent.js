import React from "react";
import {
  SpinnerCircular,
  SpinnerDotted,
  SpinnerRoundOutlined,
} from "spinners-react";

import { styled } from "@material-ui/core/styles";

const LoadingMainStyle = styled("div")(({ theme }) => ({
  "& .visible": {
    visibility: "visible",
  },
  "& .hidden": {
    visibility: "hidden",
  },

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const LoadingComponent = ({ visible, type }) => {
  return (
    <LoadingMainStyle className={`${visible ? "visible" : "hidden"}`}>
      {type === "round" ? (
        <SpinnerRoundOutlined style={{ color: "primary.main" }} />
      ) : type === "dotted" ? (
        <SpinnerDotted style={{ color: "primary.main" }} />
      ) : type === "circular" ? (
        <SpinnerCircular style={{ color: "primary.main" }} />
      ) : null}
    </LoadingMainStyle>
  );
};

export default LoadingComponent;
