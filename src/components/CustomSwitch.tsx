import * as React from "react";
import { styled } from "@mui/material/styles";
import Switch, { SwitchProps } from "@mui/material/Switch";

const VegNonVegSwitch = styled((props: SwitchProps) => (
  <Switch
    focusVisibleClassName=".Mui-focusVisible"
    disableRipple
    inputProps={{
      "aria-label": props.checked ? "Switch is ON" : "Switch is OFF",
    }}
    {...props}
  />
))(({ theme }) => ({
  width: 40,
  height: 24,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#65C466",
        opacity: 1,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    width: 20,
    height: 20,
  },
  "& .MuiSwitch-track": {
    borderRadius: 13,
    backgroundColor: "#222a35",
    opacity: 1,
  },
  // Responsive sizes
  [theme.breakpoints.up("sm")]: {
    width: 48,
    height: 28,
    "& .MuiSwitch-switchBase": {
      "&.Mui-checked": {
        transform: "translateX(20px)",
      },
    },
    "& .MuiSwitch-thumb": {
      width: 24,
      height: 24,
    },
    "& .MuiSwitch-track": {
      borderRadius: 15,
    },
  },
  [theme.breakpoints.up("md")]: {
    width: 56,
    height: 32,
    "& .MuiSwitch-switchBase": {
      "&.Mui-checked": {
        transform: "translateX(24px)",
      },
    },
    "& .MuiSwitch-thumb": {
      width: 28,
      height: 28,
    },
    "& .MuiSwitch-track": {
      borderRadius: 16,
    },
  },
  [theme.breakpoints.up("lg")]: {
    width: 54,
    height: 26,
    "& .MuiSwitch-switchBase": {
      "&.Mui-checked": {
        transform: "translateX(28px)",
      },
    },
    "& .MuiSwitch-thumb": {
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 18,
    },
  },
}));

export default VegNonVegSwitch;
